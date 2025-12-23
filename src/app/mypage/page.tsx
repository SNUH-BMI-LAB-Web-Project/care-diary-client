"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
  GENDER_LABELS,
  MEDICAL_COVERAGE_LABELS,
  SOCIAL_WELFARE_LABELS,
  UserRole,
} from "@/lib/constants";
import type { RegisterFormData } from "@/lib/types";

type MyPageUserData = RegisterFormData & {
  registrationDate: string; // TODO: 가입일 응답으로 줘야 함
};

function Field({
  label,
  value,
  className,
  small,
}: {
  label: string;
  value: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={className}>
      <p
        className={
          small
            ? "text-xs text-muted-foreground"
            : "text-sm font-medium text-muted-foreground"
        }
      >
        {label}
      </p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

export default function MyPage() {
  const { name, email, avatarUrl } = useCurrentUser();

  const userData: MyPageUserData = {
    // 기본
    name: name ?? "홍길동",
    email: email ?? "hong@example.com",
    gender: "MALE",
    birth: "1990-01-01",
    address: "서울특별시 종로구 사직로 00",
    role: UserRole.USER,

    // 선택 기본 정보
    religion: "무교",
    educationJob: "대학교 재학",

    // 환자 정보 (선택)
    mainDiagnosis: "조현병 (주 진단명)",
    education: "대학교 4학년 재학 (발병 전 기준)",
    historyDiagnosis: "우울장애",
    historyDate: "2023-05",
    historyHospital: "서울 ○○병원",
    mainSymptoms: "불안, 수면장애, 집중력 저하",
    currentHospital: "서울 ○○정신건강의학과의원",
    currentResidence: "그룹홈 거주",

    // 의료/복지
    medicalCoverage: "",

    specialCaseRegistered: false,
    specialCaseRegisteredDate: "",

    disabilityRegistered: false,
    disabilityStatus: "NOT_REGISTERED",
    disabilityType: "",
    disabilitySeverity: "",

    socialWelfareServices: [],

    registrationDate: "2025년 1월 1일",
  };

  const initials = userData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const genderLabel = GENDER_LABELS[userData.gender] ?? "-";
  const medicalCoverageLabel = userData.medicalCoverage
    ? (MEDICAL_COVERAGE_LABELS[userData.medicalCoverage] ??
      userData.medicalCoverage)
    : "-";

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="container max-w-5xl py-8 mx-auto space-y-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 1. 상단 프로필 카드 */}
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

          {/* 2. 기본 정보 */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="이름" value={userData.name} />
                <Field label="이메일" value={userData.email} />
                <Field label="성별" value={genderLabel} />
                <Field label="생년월일" value={userData.birth || "-"} />
                <Field
                  label="주소"
                  value={userData.address || "-"}
                  className="sm:col-span-2"
                />

                {/* 가입 폼 선택 필드 */}
                <Field label="종교" value={userData.religion || "-"} />
                <Field label="학력/직업" value={userData.educationJob || "-"} />
              </div>
            </CardContent>
          </Card>

          {/* 3. 환자 정보 */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>환자 정보</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <section className="space-y-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="주 진단명"
                    value={userData.mainDiagnosis || "-"}
                  />
                  <Field
                    label="학력 (발병 전)"
                    value={userData.education || "-"}
                  />
                </div>
              </section>

              <hr className="border-border" />

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  병력
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="진단명"
                    value={userData.historyDiagnosis || "-"}
                    small
                  />
                  <Field
                    label="진단받은 시기"
                    value={userData.historyDate || "-"}
                    small
                  />
                  <Field
                    label="진단받은 병원"
                    value={userData.historyHospital || "-"}
                    small
                    className="sm:col-span-2"
                  />
                </div>
              </section>

              <hr className="border-border" />

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  현재 상태
                </h3>

                <div className="space-y-4">
                  <Field
                    label="주증상"
                    value={userData.mainSymptoms || "-"}
                    small
                  />
                  <Field
                    label="현재 이용 병원"
                    value={userData.currentHospital || "-"}
                    small
                  />
                  <Field
                    label="현재 거주지"
                    value={userData.currentResidence || "-"}
                    small
                  />
                </div>
              </section>

              <hr className="border-border" />

              {/* 의료·복지 (가입 폼 필드 그대로 노출) */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  의료·복지 정보
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="의료보장" value={medicalCoverageLabel} />

                  <Field
                    label="산정특례"
                    value={
                      userData.specialCaseRegistered
                        ? `등록 (${userData.specialCaseRegisteredDate || "등록일 미입력"})`
                        : "미등록"
                    }
                  />

                  <Field
                    label="장애 등록"
                    value={userData.disabilityRegistered ? "등록" : "미등록"}
                  />

                  {userData.disabilityRegistered && (
                    <>
                      <Field
                        label="진행 상태"
                        value={userData.disabilityStatus || "-"}
                      />
                      <Field
                        label="종류"
                        value={userData.disabilityType || "-"}
                      />
                      <Field
                        label="정도"
                        value={userData.disabilitySeverity || "-"}
                      />
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      사회복지서비스
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {userData.socialWelfareServices?.length ? (
                        userData.socialWelfareServices.map((k) => (
                          <span
                            key={k}
                            className="inline-flex items-center rounded-sm border px-2 py-1 text-xs"
                          >
                            {SOCIAL_WELFARE_LABELS[k] ?? k}
                          </span>
                        ))
                      ) : (
                        <p className="mt-1">-</p>
                      )}
                    </div>
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
