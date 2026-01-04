"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/common/line-chart";
import { adminUserApi } from "@/lib/api/client";

type ScaleCategory = "ANXIETY_DEPRESSION" | "ANGER";

type UserScaleItem = {
  scaleCategory: ScaleCategory;
  score: number;
  createdAt?: string;
};

type ApiResponse = {
  status: number;
  code: string;
  message: string;
  data?: {
    items: Record<string, UserScaleItem[]>;
  };
};

export default function AnalysisGraphsClient({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const [itemsBySession, setItemsBySession] = useState<
    Record<string, UserScaleItem[]>
  >({});

  useEffect(() => {
    let mounted = true;

    async function fetchScales() {
      try {
        const res: ApiResponse = await adminUserApi.findUserScales({ userId });
        if (!mounted) return;
        setItemsBySession(res?.data?.items ?? {});
      } catch (error) {
        console.error("Error fetching user scales:", error);
      }
    }

    fetchScales();
    return () => {
      mounted = false;
    };
  }, [userId]);

  const { anxietyDepressionData, angerData } = useMemo(() => {
    const sessions = Object.keys(itemsBySession)
      .map(Number)
      .sort((a, b) => a - b);

    const pickScore = (session: number, category: ScaleCategory) =>
      itemsBySession[String(session)]?.find((x) => x.scaleCategory === category)
        ?.score ?? null;

    return {
      anxietyDepressionData: sessions
        .map((s) => {
          const score = pickScore(s, "ANXIETY_DEPRESSION");
          return score == null ? null : { session: s + 1, score };
        })
        .filter(Boolean) as { session: number; score: number }[],
      angerData: sessions
        .map((s) => {
          const score = pickScore(s, "ANGER");
          return score == null ? null : { session: s + 1, score };
        })
        .filter(Boolean) as { session: number; score: number }[],
    };
  }, [itemsBySession]);

  const name = decodeURIComponent(userName);

  return (
    <div className="min-h-screen bg-muted">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 max-w-3xl items-center gap-4 px-6">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">설문 통계 확인</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl py-8 pb-10">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">
            {name} 님의 차수별 설문 척도 변화
          </h2>
          <p className="text-sm text-muted-foreground">
            우울·불안, 분노 척도의 차수별 추이를 확인하세요
          </p>
        </div>

        <div className="space-y-6">
          <LineChart
            title="우울·불안 척도"
            data={anxietyDepressionData}
            color="#3b82f6"
          />
          <LineChart title="분노 척도" data={angerData} color="#ef4444" />
        </div>
      </main>
    </div>
  );
}
