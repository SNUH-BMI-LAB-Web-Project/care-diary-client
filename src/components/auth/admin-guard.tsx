"use client";

import type React from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { role } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (role !== UserRole.ADMIN) {
      // Admin이 아니면 홈으로 리다이렉트
      router.replace("/home");
    }
  }, [role, router]);

  // Admin이 아니면 아무것도 렌더링하지 않음
  if (role !== UserRole.ADMIN) {
    return null;
  }

  return <>{children}</>;
}
