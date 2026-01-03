"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { diaryApi } from "@/lib/api/client";
import { EMOTION_CONFIG, EMOTION_LABELS } from "@/lib/constants";
import { formatKoreanDate } from "@/utils/date";
import { DiaryDto } from "@/generated-api";

export default function DiaryListPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const monthParam = sp.get("month");

  const baseDate = useMemo(() => {
    if (!monthParam) return new Date();

    return new Date(`${monthParam}-01T00:00:00Z`);
  }, [monthParam]);

  const year = baseDate.getUTCFullYear();
  const month = baseDate.getUTCMonth();

  const [diaries, setDiaries] = useState<DiaryDto[]>([]);

  const goMonth = (y: number, m: number) => {
    const value = `${y}-${String(m + 1).padStart(2, "0")}`;
    router.replace(`/diary/list?month=${value}`);
  };

  const handlePrevMonth = () => {
    const prev = new Date(Date.UTC(year, month - 1, 1));
    goMonth(prev.getUTCFullYear(), prev.getUTCMonth());
  };

  const handleNextMonth = () => {
    const next = new Date(Date.UTC(year, month + 1, 1));
    goMonth(next.getUTCFullYear(), next.getUTCMonth());
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const start = new Date(Date.UTC(year, month, 1));
        const end = new Date(Date.UTC(year, month + 1, 0));

        const res = await diaryApi.findAllDiariesByMe({
          startDate: start,
          endDate: end,
        });

        setDiaries(res.data?.diaries ?? []);
      } finally {
      }
    };

    fetchDiaries();
  }, [year, month]);

  const sortedDiaries = useMemo(
    () =>
      [...diaries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [diaries],
  );

  const currentMonthLabel = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
  }).format(new Date(year, month, 1));

  const monthQuery = `${year}-${String(month + 1).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 max-w-3xl items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.replace("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">일기 목록</h1>
        </div>
      </header>

      <main className="container max-w-5xl py-8 mx-auto space-y-6">
        <section className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{currentMonthLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          {sortedDiaries.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                이 달에는 작성된 일기가 없어요.
              </CardContent>
            </Card>
          ) : (
            sortedDiaries.map((diary) => {
              const emotionConfig = EMOTION_CONFIG[diary.emotion];
              const EmotionIcon = emotionConfig.icon;
              const formattedDate = formatKoreanDate(new Date(diary.date));

              return (
                <Link
                  key={diary.diaryId}
                  href={`/diary/${diary.diaryId}?from=/diary/list?month=${monthQuery}`}
                >
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer mb-4">
                    <CardContent className="flex items-start gap-4 py-2">
                      <div
                        className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${emotionConfig.bgColor}`}
                      >
                        <EmotionIcon
                          className={`h-5 w-5 ${emotionConfig.color}`}
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">
                            {EMOTION_LABELS[diary.emotion]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formattedDate}
                          </p>
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {diary.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
