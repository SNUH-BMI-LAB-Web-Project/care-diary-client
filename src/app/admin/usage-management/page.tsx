"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";
import { TablePaginationBar } from "@/components/common/table-pagination-bar";

const cumulativeUsage = {
  userCount: 45,
  analysisCount: 1250,
  costPerAnalysis: 500,
};

const monthlyUsage = {
  userCount: 38,
  analysisCount: 156,
  costPerAnalysis: 500,
};

type UserUsage = {
  id: string;
  name: string;
  organization: string;
  analysisCount: number;
  patientCount: number;
};

const mockUserUsage: UserUsage[] = [
  {
    id: "1",
    name: "김의사",
    organization: "서울대학교병원",
    analysisCount: 35,
    patientCount: 3,
  },
  {
    id: "2",
    name: "이간호사",
    organization: "강남클리닉",
    analysisCount: 28,
    patientCount: 5,
  },
  {
    id: "3",
    name: "박연구원",
    organization: "의료연구소",
    analysisCount: 42,
    patientCount: 7,
  },
  {
    id: "4",
    name: "박연구원",
    organization: "의료연구소",
    analysisCount: 42,
    patientCount: 7,
  },
  {
    id: "5",
    name: "박연구원",
    organization: "의료연구소",
    analysisCount: 42,
    patientCount: 7,
  },
  {
    id: "6",
    name: "박연구원",
    organization: "의료연구소",
    analysisCount: 42,
    patientCount: 7,
  },
  {
    id: "7",
    name: "박연구원",
    organization: "의료연구소",
    analysisCount: 42,
    patientCount: 7,
  },
];

function usePagination<T>(rows: T[], initialPerPage = 10) {
  const [page, setPage] = useState(1);
  const [perPage] = useState(initialPerPage);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const end = Math.min(start + perPage, total);
  const pageRows = rows.slice(start, end);

  if (page > totalPages && totalPages > 0) {
    setTimeout(() => setPage(totalPages), 0);
  }

  return {
    page,
    perPage,
    total,
    totalPages,
    startIndex: start + 1,
    endIndex: end,
    pageRows,
    setPage,
  };
}

export default function UsageManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 누적 사용량 테이블
  const cumulativeRows = useMemo(
    () => [
      {
        userCount: `${cumulativeUsage.userCount}명`,
        analysisCount: `${cumulativeUsage.analysisCount}건`,
        cost: `${cumulativeUsage.costPerAnalysis}원 / 건`,
      },
    ],
    [],
  );
  const cumulativePg = usePagination(cumulativeRows, 10);

  // 월간 사용량 테이블
  const monthlyRows = useMemo(
    () => [
      {
        userCount: `${monthlyUsage.userCount}명`,
        analysisCount: `${monthlyUsage.analysisCount}건`,
        cost: `${monthlyUsage.costPerAnalysis}원 / 건`,
      },
    ],
    [],
  );
  const monthlyPg = usePagination(monthlyRows, 10);

  // 사용자별 사용량 테이블
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mockUserUsage;
    return mockUserUsage.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.organization.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const usersPg = usePagination(filteredUsers, 10);

  return (
    <div className="min-h-screen bg-background w-full overflow-auto">
      <div className="container mx-auto lg:p-8 md:p-8 sm:p-6">
        <div className="space-y-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-foreground">사용량 관리</h1>
            <p className="text-muted-foreground">시스템 사용량 통계 및 관리</p>
          </div>

          <Card className="rounded-sm shadow-sm bg-muted">
            <CardHeader>
              <CardTitle className="text-lg">누적 사용량</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border rounded-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        사용자수
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        분석건수
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        사용료
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cumulativePg.pageRows.map((row, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="text-center py-3 px-4 text-sm">
                          {row.userCount}
                        </td>
                        <td className="text-center py-3 px-4 text-sm">
                          {row.analysisCount}
                        </td>
                        <td className="text-center py-3 px-4 text-sm">
                          {row.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-sm bg-muted">
            <CardHeader>
              <CardTitle className="text-lg">월간 사용량</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border rounded-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        사용자수
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        분석건수
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        사용료
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyPg.pageRows.map((row, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="text-center py-3 px-4 text-sm">
                          {row.userCount}
                        </td>
                        <td className="text-center py-3 px-4 text-sm">
                          {row.analysisCount}
                        </td>
                        <td className="text-center py-3 px-4 text-sm">
                          {row.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-sm bg-muted">
            <CardHeader>
              <CardTitle className="text-lg">사용자별 사용량</CardTitle>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      value={searchQuery}
                      onChange={(e) => {
                        usersPg.setPage(1);
                        setSearchQuery(e.target.value);
                      }}
                      className="pl-10 bg-white border rounded-sm"
                    />
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full md:w-auto rounded-sm min-w-32"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="ml-2">데이터 내보내기</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border rounded-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        사용자명
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        소속기관
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        분석건수
                      </th>
                      <th className="text-center py-3 px-4 border-b border-border text-sm font-medium">
                        대상자수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPg.pageRows.map((user) => (
                      <tr key={user.id} className="bg-white">
                        <td className="text-center py-3 px-4 border-b border-border text-sm">
                          {user.name}
                        </td>
                        <td className="text-center py-3 px-4 border-b border-border text-sm">
                          {user.organization}
                        </td>
                        <td className="text-center py-3 px-4 border-b border-border text-sm">
                          {user.analysisCount}건
                        </td>
                        <td className="text-center py-3 px-4 border-b border-border text-sm">
                          {user.patientCount}명
                        </td>
                      </tr>
                    ))}
                    {usersPg.total === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-sm text-muted-foreground bg-white"
                        >
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <TablePaginationBar
                total={usersPg.total}
                page={usersPg.page}
                totalPages={usersPg.totalPages}
                startIdx={usersPg.startIndex}
                endIdx={usersPg.endIndex}
                onPageChangeAction={usersPg.setPage}
                noun="명"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
