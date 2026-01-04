"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { adminDiariyApi } from "@/lib/api/client";
import { cn } from "@/lib/utils";

import type {
  CommonResponseAdminDiarySdohResponse,
  DiarySdohItemDto,
} from "@/generated-api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function getMajorTitle(item: DiarySdohItemDto): string {
  return item.majorCat?.trim() || "기타";
}

function toTableItem(item: DiarySdohItemDto) {
  return {
    key: `${item.elementNo}-${item.signCode ?? "NA"}`,
    label:
      item.typeLabel ??
      item.subCat ??
      item.middleCat ??
      item.majorCat ??
      `항목 ${item.elementNo}`,
    signCode: item.signCode ?? "-",
    severity: item.severity ?? "-",
    duration: item.duration ?? "-",
    coping: item.coping ?? "-",
    recommendation: item.recommendation ?? "-",
    evidences: item.evidences ?? [],
  };
}

function SdohTable({
  title,
  items,
}: {
  title: string;
  items: ReturnType<typeof toTableItem>[];
}) {
  return (
    <div className="mb-10">
      <h3 className="mb-3 text-base font-semibold">{title}</h3>

      <div className="overflow-hidden rounded-sm border border-border bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border-b border-r border-border p-2 text-sm font-medium text-left w-[36%]">
                항목
              </th>
              <th className="border-b border-r border-border p-2 text-sm font-medium text-center w-[8%]">
                부호
              </th>
              <th className="border-b border-r border-border p-2 text-sm font-medium text-center w-[8%]">
                심각성
              </th>
              <th className="border-b border-r border-border p-2 text-sm font-medium text-center w-[8%]">
                지속기간
              </th>
              <th className="border-b border-r border-border p-2 text-sm font-medium text-center w-[8%]">
                대처능력
              </th>
              <th className="border-b border-border p-2 text-sm font-medium text-center">
                권고되는 개입 / 근거
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((it, idx) => (
              <tr key={it.key} className="text-sm">
                {/* ✅ 각 칼럼 구분 보더: border-r 추가 + row 구분 border-b */}
                <td
                  className={cn(
                    "p-3 border-r border-border align-top",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {it.label}
                </td>

                <td
                  className={cn(
                    "p-3 text-center border-r border-border align-top",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {it.signCode}
                </td>

                <td
                  className={cn(
                    "p-3 text-center border-r border-border align-top",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {it.severity}
                </td>

                <td
                  className={cn(
                    "p-3 text-center border-r border-border align-top",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {it.duration}
                </td>

                <td
                  className={cn(
                    "p-3 text-center border-r border-border align-top",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {it.coping}
                </td>

                <td
                  className={cn(
                    "p-2 align-top text-center",
                    idx !== items.length - 1 && "border-b border-border",
                  )}
                >
                  {/* ✅ 셀에는 버튼만 (요약/개입/근거는 모달 안으로) */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:underline hover:text-primary rounded-sm"
                      >
                        자세히 보기
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          {it.label}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-5">
                        {/* 요약(메타) */}
                        <div className="rounded-sm border border-border bg-muted/30 p-3">
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            요약
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                부호
                              </span>{" "}
                              <span className="font-medium">{it.signCode}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                심각성
                              </span>{" "}
                              <span className="font-medium">{it.severity}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                지속기간
                              </span>{" "}
                              <span className="font-medium">{it.duration}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                대처능력
                              </span>{" "}
                              <span className="font-medium">{it.coping}</span>
                            </div>
                          </div>
                        </div>

                        {/* 권고되는 개입 */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            권고되는 개입
                          </h4>
                          <p className="text-sm leading-relaxed">
                            {it.recommendation}
                          </p>
                        </div>

                        {/* 근거 */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">근거</h4>

                          {it.evidences.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              표시할 근거가 없습니다.
                            </p>
                          ) : (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {it.evidences.map((ev, i) => (
                                <li key={i}>{ev}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-sm text-muted-foreground"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SdohResultsContent({ diaryId }: { diaryId: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<DiarySdohItemDto[]>([]);

  useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res: CommonResponseAdminDiarySdohResponse =
          await adminDiariyApi.findSdoh({ diaryId });

        const list = res?.data?.items ?? [];
        if (mounted) setItems(list);
      } catch (e) {
        console.error("Failed to fetch SDoH data:", e);
        if (mounted) setError("SDoH 데이터를 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [diaryId]);

  const grouped = useMemo(() => {
    const map = new Map<string, ReturnType<typeof toTableItem>[]>();

    for (const item of items) {
      const title = getMajorTitle(item);
      const arr = map.get(title) ?? [];
      arr.push(toTableItem(item));
      map.set(title, arr);
    }

    return Array.from(map.entries());
  }, [items]);

  if (loading) {
    return <div className="min-h-screen bg-muted p-6">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted p-6">
        <Card className="rounded-sm">
          <CardContent className="p-6 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container max-w-5xl mx-auto py-8 pb-10">
        <div className="flex h-16 max-w-3xl items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold">SDoH 분석 결과</h2>
        </div>

        <Card className="rounded-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg">
              사회적 건강 결정요인(SDoH)
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {grouped.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                SDoH 데이터가 없습니다.
              </div>
            ) : (
              grouped.map(([t, list]) => (
                <SdohTable key={t} title={t} items={list} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
