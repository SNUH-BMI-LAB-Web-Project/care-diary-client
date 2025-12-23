"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface UsageStats {
  totalUsers: number;
  totalAnalyses: number;
  costPerAnalysis: number;
}

interface MonthlyUsageStats extends UsageStats {
  month: string;
}

interface UserUsageStats {
  userId: string;
  userName: string;
  diaryCount: number;
  analysisCount: number;
}

export function UsageManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const cumulativeUsage: UsageStats = {
    totalUsers: 156,
    totalAnalyses: 1248,
    costPerAnalysis: 5000,
  };

  const monthlyUsage: MonthlyUsageStats = {
    month: "2025년 12월",
    totalUsers: 45,
    totalAnalyses: 342,
    costPerAnalysis: 5000,
  };

  const userUsageData: UserUsageStats[] = [
    { userId: "U001", userName: "피카츄", diaryCount: 45, analysisCount: 12 },
    { userId: "U002", userName: "라이츄", diaryCount: 38, analysisCount: 10 },
    { userId: "U003", userName: "파이리", diaryCount: 52, analysisCount: 15 },
    { userId: "U004", userName: "꼬부기", diaryCount: 29, analysisCount: 8 },
  ];

  const filteredUsers = userUsageData.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 px-40 py-8 pb-10 bg-muted">
      <section>
        <h2 className="mb-4 text-xl font-bold">누적 사용량</h2>
        <Card className="overflow-hidden rounded-sm">
          <div className="bg-primary/5">
            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">사용자 수</div>
                <div className="mt-2 text-2xl font-bold">
                  {cumulativeUsage.totalUsers} 명
                </div>
              </div>
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">분석 건 수</div>
                <div className="mt-2 text-2xl font-bold">
                  {cumulativeUsage.totalAnalyses} 건
                </div>
              </div>
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">사용료</div>
                <div className="mt-2 text-2xl font-bold">
                  {cumulativeUsage.costPerAnalysis.toLocaleString()} 원/건
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">월간 사용량</h2>
        <Card className="overflow-hidden rounded-sm">
          <div className="bg-primary/5">
            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">사용자 수</div>
                <div className="mt-2 text-2xl font-bold">
                  {monthlyUsage.totalUsers} 명
                </div>
              </div>
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">분석 건 수</div>
                <div className="mt-2 text-2xl font-bold">
                  {monthlyUsage.totalAnalyses} 건
                </div>
              </div>
              <div className="bg-white p-6">
                <div className="text-sm text-muted-foreground">사용료</div>
                <div className="mt-2 text-2xl font-bold">
                  {monthlyUsage.costPerAnalysis.toLocaleString()} 원/건
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">사용자별 사용량</h2>
        <Card className="rounded-sm">
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="사용자 ID 또는 사용자명 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-sm"
              />
            </div>

            <div className="overflow-hidden rounded-sm border border-border">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border-b border-border p-3 text-sm font-medium text-left">
                      사용자 ID
                    </th>
                    <th className="border-b border-border p-3 text-sm font-medium text-left">
                      사용자 이름
                    </th>
                    <th className="border-b border-border p-3 text-sm font-medium text-right">
                      일기 작성 건수
                    </th>
                    <th className="border-b border-border p-3 text-sm font-medium text-right">
                      분석 건수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border-b border-border p-3 text-sm font-mono text-muted-foreground">
                        {user.userId}
                      </td>
                      <td className="border-b border-border p-3 text-sm">
                        {user.userName}
                      </td>
                      <td className="border-b border-border p-3 text-sm text-right font-medium">
                        {user.diaryCount} 건
                      </td>
                      <td className="border-b border-border p-3 text-sm text-right font-medium">
                        {user.analysisCount} 건
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
