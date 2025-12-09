"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function MyPage() {
  const { name, email, avatarUrl } = useCurrentUser();

  const userData = {
    // 기본 정보
    name: name ?? "홍길동",
    email: email ?? "hong@example.com",
    phone: "010-1234-5678",
    birthDate: "1990-01-01",
    gender: "남성",
    address: "서울특별시 종로구 사직로 00",
    education: "대학교 4학년 재학 (발병 전 기준)",
    registrationDate: "2025년 1월 1일",

    // 건강 / 병력 정보
    mainDiagnosis: "조현병 (주 진단명)",
    historyDiagnosis: "우울장애",
    historyDate: "2023-05",
    historyHospital: "서울 ○○병원",
    mainSymptoms: "불안, 수면장애, 집중력 저하",
    currentHospital: "서울 ○○정신건강의학과의원",
    currentResidence: "그룹홈 거주",
  };

  const initials = userData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="container max-w-5xl py-8 mx-auto space-y-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 프로필 */}
          <Card className="rounded-sm">
            <CardContent className="flex items-center justify-between py-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={avatarUrl || "/placeholder.svg?height=80&width=80"}
                    alt={userData.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-right">
                가입일 : {userData.registrationDate}
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    이름
                  </p>
                  <p className="mt-1">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    이메일
                  </p>
                  <p className="mt-1">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    전화번호
                  </p>
                  <p className="mt-1">{userData.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    생년월일
                  </p>
                  <p className="mt-1">{userData.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    성별
                  </p>
                  <p className="mt-1">{userData.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    주소
                  </p>
                  <p className="mt-1">{userData.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 건강 / 병력 정보 */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>건강 · 병력 정보</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* 주 진단명 + 학력 */}
              <section className="space-y-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      주 진단명
                    </p>
                    <p className="mt-1">{userData.mainDiagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      학력 (발병 전 기준)
                    </p>
                    <p className="mt-1">{userData.education}</p>
                  </div>
                </div>
              </section>

              <hr className="border-border" />

              {/* 병력 */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  병력
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">진단명</p>
                    <p className="mt-1">{userData.historyDiagnosis || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      진단받은 시기
                    </p>
                    <p className="mt-1">{userData.historyDate || "-"}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground">
                      진단받은 병원
                    </p>
                    <p className="mt-1">{userData.historyHospital || "-"}</p>
                  </div>
                </div>
              </section>

              <hr className="border-border" />

              {/* 현재 상태 */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  현재 상태
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">주증상</p>
                    <p className="mt-1">{userData.mainSymptoms || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      현재 이용 병원
                    </p>
                    <p className="mt-1">{userData.currentHospital || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">현재 거주지</p>
                    <p className="mt-1">{userData.currentResidence || "-"}</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-sm">
              정보 수정
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-sm text-destructive hover:text-destructive"
            >
              계정 삭제
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
