"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { LogOut, ShieldCheck, User, HeartHandshake } from "lucide-react";
import { clearOAuthSession, getOAuthSession } from "@/lib/auth-storage";
import { decodeJwtPayload } from "@/lib/jwt";

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

type AuthRole = "ADMIN" | "CARE_MANAGER" | "USER";

type AuthJwtPayload = {
  name?: string;
  role?: AuthRole;
};

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [userName, setUserName] = useState("사용자");
  const [role, setRole] = useState<AuthRole | null>(null);

  useEffect(() => {
    const { token } = getOAuthSession();
    const payload = token ? decodeJwtPayload<AuthJwtPayload>(token) : null;

    const nextName = payload?.name?.trim() ? payload.name.trim() : "사용자";
    const nextRole = payload?.role ?? null;

    setUserName(nextName);
    setRole(nextRole);
  }, []);

  const canManageUsage = role === "ADMIN";
  const showAdminTabs = role === "ADMIN" && !!onTabChange;

  const initial = userName.charAt(0).toUpperCase();

  const roleLabel =
    role === "ADMIN"
      ? "총괄 관리자"
      : role === "CARE_MANAGER"
        ? "담당 관리자"
        : null;

  const RoleIcon =
    role === "ADMIN"
      ? ShieldCheck
      : role === "CARE_MANAGER"
        ? HeartHandshake
        : null;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white">
      <div className="flex h-18 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/home" className="flex items-center">
            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-bold cursor-pointer hover:opacity-80">
                돌봄일기
              </h1>

              {roleLabel && RoleIcon && (
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <RoleIcon className="h-3.5 w-3.5" />
                  <span>{roleLabel}</span>
                </div>
              )}
            </div>
          </Link>

          {showAdminTabs && (
            <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1">
              <button
                type="button"
                onClick={() => onTabChange("users")}
                className={[
                  "h-9 rounded-md px-4 text-sm font-medium transition",
                  activeTab === "users"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                사용자 관리
              </button>

              {canManageUsage && (
                <button
                  type="button"
                  onClick={() => onTabChange("usage")}
                  className={[
                    "h-9 rounded-md px-4 text-sm font-medium transition",
                    activeTab === "usage"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  사용량 관리
                </button>
              )}
            </div>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="gap-3 h-auto py-2 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{userName}</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={20}
            className="w-48 rounded-sm p-2"
          >
            <div className="flex flex-col gap-1">
              <Link href="/mypage">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 rounded-sm"
                  size="sm"
                >
                  <User className="h-4 w-4" />
                  마이페이지
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 rounded-sm text-destructive hover:text-destructive"
                size="sm"
                onClick={() => {
                  clearOAuthSession();
                  window.location.replace("/login");
                }}
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
