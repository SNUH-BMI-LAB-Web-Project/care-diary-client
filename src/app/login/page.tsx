"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!email) {
      toast.error("이메일을 입력하세요");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("올바른 이메일 형식이 아닙니다");
      return false;
    }
    if (!password) {
      toast.error("비밀번호를 입력하세요");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;

    setIsLoading(true);

    try {
      const loginPromise = (async () => {
        await new Promise((r) => setTimeout(r, 600));
        if (email === "admin@hospital.com" && password === "password") {
          return true;
        }
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      })();

      toast.promise(loginPromise, {
        loading: "로그인 중...",
        success: "로그인 성공! 대시보드로 이동합니다.",
        error: (err) => err.message ?? "로그인 중 오류가 발생했습니다.",
      });

      await loginPromise;
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full sm:w-[420px] max-w-[calc(100vw-2rem)] rounded-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            Care Diary
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            계정에 로그인하여 시스템에 접근하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-white border rounded-sm placeholder:text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <div className="flex w-full justify-between items-center">
                  <div>비밀번호</div>
                  {/* TODO: 모달로 변경 */}
                  <a
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    비밀번호 찾기
                  </a>
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="bg-white border rounded-sm placeholder:text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-sm"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="text-center space-y-2">
              <div className="text-xs text-muted-foreground">
                계정이 없으신가요?{" "}
                <a href="/signup" className="text-primary hover:underline">
                  회원가입
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
