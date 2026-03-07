"use client";

import { useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordCloud from "wordcloud";
import type { AdminUserWordCloudResponse } from "@/generated-api";

interface UserWordCloudProps {
  data: AdminUserWordCloudResponse | null;
  loading?: boolean;
  isDemo?: boolean;
}

export function UserWordCloud({
  data,
  loading = false,
  isDemo = false,
}: UserWordCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const list = useMemo(
    () =>
      (data?.items ?? []).map((item) => [item.word, item.count]) as Array<
        [string, number]
      >,
    [data],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || list.length === 0) return;

    const width = 420;
    const height = 320;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    WordCloud(canvas, {
      list,
      gridSize: Math.max(8, Math.round(width / 32)),
      weightFactor: (size) => Math.max(14, Math.min(size * 2.2, 72)),
      fontFamily: "Pretendard, sans-serif",
      color: () => {
        const colors = [
          "#2563eb",
          "#16a34a",
          "#f97316",
          "#dc2626",
          "#7c3aed",
          "#0891b2",
          "#65a30d",
          "#ea580c",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      },
      rotateRatio: 0.2,
      minRotation: 0,
      maxRotation: Math.PI / 2,
      rotationSteps: 2,
      backgroundColor: "transparent",
      drawOutOfBound: false,
      shrinkToFit: true,
    });
  }, [list]);

  return (
    <Card className="rounded-sm h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">워드클라우드</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              일기 {data?.totalDiaries ?? 0}개 · 전체 단어{" "}
              {data?.totalTokens ?? 0}개
            </p>
          </div>

          {/*{isDemo && (*/}
          {/*  <span className="rounded-sm border px-2 py-1 text-xs text-muted-foreground">*/}
          {/*    Demo*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        {loading ? (
          <div className="text-sm text-muted-foreground">불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            워드클라우드 데이터가 없습니다.
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-sm border bg-muted/20 p-2">
            <canvas ref={canvasRef} className="block" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
