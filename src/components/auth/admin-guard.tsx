"use client";

import type React from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { role } = useCurrentUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);

    if (role !== UserRole.ADMIN) {
      router.replace("/home");
    }
  }, [role, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  if (role !== UserRole.ADMIN) {
    return null;
  }

  return <>{children}</>;
}
