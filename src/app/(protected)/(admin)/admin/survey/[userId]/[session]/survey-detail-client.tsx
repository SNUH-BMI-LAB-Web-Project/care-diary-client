"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminUserApi } from "@/lib/api/client";
import type {
  AdminUserScaleQuestionResultResponse,
  ScaleQuestionResultDto,
  ScaleQuestionItemDto,
} from "@/generated-api";

type ScaleCategory = "ANXIETY_DEPRESSION" | "ANGER";

const SCALE_TITLE: Record<ScaleCategory, string> = {
  ANXIETY_DEPRESSION: "우울·불안 설문",
  ANGER: "분노 설문",
};

export default function SurveyDetailClient({
  userId,
  session,
}: {
  userId: string;
  session: string;
}) {
  const count = useMemo(() => Number(session), [session]);

  const [data, setData] = useState<AdminUserScaleQuestionResultResponse | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const res = await adminUserApi.findScaleQuestionResult({
          userId,
          count,
        });
        if (!mounted) return;
        setData(res?.data ?? null);
      } catch (error) {
        if (!mounted) return;
        console.error("Error fetching scale question result:", error);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [userId, count]);

  const itemsByCategory = useMemo(() => {
    const items = (data?.items ?? {}) as Record<string, ScaleQuestionResultDto>;
    const mapped: Partial<Record<ScaleCategory, ScaleQuestionResultDto>> = {};
    for (const v of Object.values(items)) {
      const cat = v.scaleCategory as ScaleCategory;
      if (cat === "ANXIETY_DEPRESSION" || cat === "ANGER") mapped[cat] = v;
    }
    return mapped;
  }, [data]);

  return (
    <div className="min-h-screen bg-muted">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 max-w-3xl items-center gap-4 px-6">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{count + 1}회차 설문 결과 확인</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl py-8 pb-10">
        {!data ? (
          <div className="rounded-sm border bg-card p-6 text-sm text-muted-foreground">
            설문 데이터가 없습니다.
          </div>
        ) : (
          <div className="space-y-6">
            <SurveyCard
              title={SCALE_TITLE.ANXIETY_DEPRESSION}
              dto={itemsByCategory.ANXIETY_DEPRESSION}
            />
            <SurveyCard title={SCALE_TITLE.ANGER} dto={itemsByCategory.ANGER} />
          </div>
        )}
      </main>
    </div>
  );
}

function SurveyCard({
  title,
  dto,
}: {
  title: string;
  dto?: ScaleQuestionResultDto;
}) {
  const questions = (dto?.questions ?? []) as ScaleQuestionItemDto[];

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <span className="text-sm text-muted-foreground font-normal">
            총점: {typeof dto?.scaleScore === "number" ? dto.scaleScore : "-"}점
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="w-20 border-b border-border p-3 text-center text-sm font-medium">
                  번호
                </th>
                <th className="border-b border-border p-3 text-left text-sm font-medium">
                  문항
                </th>
                <th className="w-60 border-b border-border p-3 text-center text-sm font-medium">
                  응답
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => (
                <tr key={idx} className="hover:bg-muted/50">
                  <td className="border-b border-border p-3 text-center text-sm">
                    {q.questionNumber ?? idx + 1}
                  </td>
                  <td className="border-b border-border p-3 text-sm">
                    {q.questionText}
                  </td>
                  <td className="border-b border-border p-3 text-center text-sm font-medium">
                    {q.selectedOption ?? "-"}
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="border-b border-border p-6 text-center text-sm text-muted-foreground"
                  >
                    설문 응답이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
