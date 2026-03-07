"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userApi } from "@/lib/api/client";

type CareManagerItem = {
  managerId: string;
  name: string;
  email: string;
};

interface CareManagerSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (manager: CareManagerItem) => void;
}

export default function CareManagerSearchModal({
  open,
  onOpenChange,
  onSelect,
}: CareManagerSearchModalProps) {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<CareManagerItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchManagers = async (search?: string) => {
    setIsLoading(true);

    try {
      const res = await userApi.searchCareManagers({
        search: search?.trim() || undefined,
      });

      const list = res.data?.careManagers ?? [];
      setItems(list);
      setSearched(true);
    } catch (error) {
      console.error("담당 관리자 조회 실패", error);
      setItems([]);
      setSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    setKeyword("");
    fetchManagers();
  }, [open]);

  const handleSearch = () => {
    fetchManagers(keyword);
  };

  const handleReset = () => {
    setKeyword("");
    fetchManagers();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>담당 관리자 검색</DialogTitle>
          <DialogDescription>
            담당 관리자를 검색하고 선택해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="이름으로 검색"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Button type="button" onClick={handleSearch} disabled={isLoading}>
            <Search className="h-4 w-4" />
            검색
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border">
          <div
            className="max-h-[360px] overflow-y-auto"
            style={{ scrollbarGutter: "stable" }}
          >
            <table className="w-full table-fixed text-sm">
              <thead className="sticky top-0 bg-muted/50 border-b">
                <tr>
                  <th className="w-[160px] px-4 py-3 text-left font-medium">
                    이름
                  </th>
                  <th className="px-4 py-3 text-left font-medium">이메일</th>
                  <th className="w-[120px] px-4 py-3 text-center font-medium">
                    선택
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      담당 관리자 목록을 불러오는 중입니다...
                    </td>
                  </tr>
                ) : items.length > 0 ? (
                  items.map((manager) => (
                    <tr
                      key={manager.managerId}
                      className="border-b last:border-b-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 font-medium">{manager.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {manager.email}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onSelect(manager);
                            onOpenChange(false);
                          }}
                        >
                          선택
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : searched ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-10 text-center">
                      <p className="text-sm text-muted-foreground">
                        검색 결과가 없습니다.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={handleReset}
                      >
                        전체 목록 보기
                      </Button>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
