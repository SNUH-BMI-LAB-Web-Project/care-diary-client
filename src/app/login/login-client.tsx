"use client";

import { SocialLoginButton } from "@/components/auth/social-login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const sp = useSearchParams();
  const shownRef = useRef(false);

  useEffect(() => {
    if (shownRef.current) return;

    const reason = sp.get("reason");
    if (reason === "duplicate_email") {
      shownRef.current = true;
      toast.error("이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.");
      window.history.replaceState({}, "", "/login");
    }
  }, [sp]);

  const goOAuth = (provider: "google" | "naver" | "kakao") => {
    sessionStorage.setItem("oauth:provider", provider);
    window.location.href = `${API_BASE}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">돌봄일기</CardTitle>
          <CardDescription className="text-sm">
            희귀질환 환자·보호자 기록에서 정신 상태와 SDoH를
            <br />
            LLM으로 자동 추출·분석하는 서비스
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <SocialLoginButton
              provider="google"
              onClick={() => goOAuth("google")}
            />
            <SocialLoginButton
              provider="naver"
              onClick={() => goOAuth("naver")}
            />
            <SocialLoginButton
              provider="kakao"
              onClick={() => goOAuth("kakao")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
