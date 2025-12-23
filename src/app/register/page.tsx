"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  Gender,
  GENDER_LABELS,
  UserRole,
  DisabilitySeverity,
  DisabilityStatus,
  MedicalCoverage,
  SocialWelfareService,
  MEDICAL_COVERAGE_LABELS,
  SOCIAL_WELFARE_LABELS,
} from "@/lib/constants";
import { RegisterFormData } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const socialProvider = "google";

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "홍길동",
    email: "hong@example.com",
    gender: Gender.MALE,
    birth: "",
    address: "",
    role: UserRole.USER,

    religion: "",
    educationJob: "",

    mainDiagnosis: "",
    education: "",
    historyDiagnosis: "",
    historyDate: "",
    historyHospital: "",
    mainSymptoms: "",
    currentHospital: "",
    currentResidence: "",

    medicalCoverage: "",

    specialCaseRegistered: false,
    specialCaseRegisteredDate: "",

    disabilityRegistered: false,
    disabilityStatus: "NOT_REGISTERED",
    disabilityType: "",
    disabilitySeverity: "",

    socialWelfareServices: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    document.cookie = `userRole=${formData.role}; path=/; max-age=${
      60 * 60 * 24 * 7
    }`;

    if (formData.role === UserRole.ADMIN) {
      router.push("/admin/users");
    } else {
      router.push("/register/questions");
    }
  };

  const providerLabels: Record<string, string> = {
    google: "구글",
    kakao: "카카오",
    naver: "네이버",
  };

  const isAdmin = formData.role === UserRole.ADMIN;

  const toggleSocialService = (key: SocialWelfareService) => {
    setFormData((prev) => {
      const exists = prev.socialWelfareServices.includes(key);
      return {
        ...prev,
        socialWelfareServices: exists
          ? prev.socialWelfareServices.filter((v) => v !== key)
          : [...prev.socialWelfareServices, key],
      };
    });
  };

  return (
    <div className="min-h-screen bg-secondary px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">회원가입</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            돌봄일기를 시작하기 위해 정보를 입력해주세요
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
            <div>
              <p className="text-sm font-medium">기본 정보 및 환자 정보 입력</p>
              <p className="mt-1 text-xs text-destructive font-medium">
                * 표시는 필수 입력 항목입니다.
              </p>
            </div>
            <Badge variant="secondary" className="rounded-sm">
              {providerLabels[socialProvider]} 계정
            </Badge>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  일반 사용자 또는 관리자 중 가입 유형을 선택할 수 있습니다.
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAdmin"
                    className="bg-white"
                    checked={isAdmin}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        role: checked === true ? UserRole.ADMIN : UserRole.USER,
                      })
                    }
                  />
                  <Label
                    htmlFor="isAdmin"
                    className="cursor-pointer font-normal text-xs"
                  >
                    관리자로 가입
                  </Label>
                </div>
              </div>

              {/* 기본  정보 - 필수 */}
              <section className="space-y-5">
                <h2 className="text-lg font-bold">기본 정보</h2>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    이름 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    이메일 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    성별 <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value: Gender) =>
                      setFormData({ ...formData, gender: value })
                    }
                    className="flex flex-row space-x-6"
                  >
                    {Object.entries(GENDER_LABELS).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birth">
                    생년월일 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="birth"
                    type="date"
                    value={formData.birth}
                    onChange={(e) =>
                      setFormData({ ...formData, birth: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    주소 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    placeholder="주소를 입력하세요"
                  />
                </div>

                {/* 기본 정보  - 선택 (종교, 학력/직업) */}
                <div className="space-y-2">
                  <Label htmlFor="religion">종교</Label>
                  <Input
                    id="religion"
                    value={formData.religion}
                    onChange={(e) =>
                      setFormData({ ...formData, religion: e.target.value })
                    }
                    placeholder="예: 무교, 기독교, 불교 등"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="educationJob">학력/직업</Label>
                  <Input
                    id="educationJob"
                    value={formData.educationJob}
                    onChange={(e) =>
                      setFormData({ ...formData, educationJob: e.target.value })
                    }
                    placeholder="예: 대학교 재학, 회사원 등"
                  />
                </div>
              </section>

              {/* 환자 정보 (유저만)  */}
              {!isAdmin && (
                <section className="space-y-5 pt-4 border-t">
                  <div className="flex flex-row items-center space-x-2">
                    <h2 className="text-lg font-bold">환자 정보</h2>
                    <span className="text-xs text-muted-foreground">
                      (선택)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainDiagnosis">주 진단명</Label>
                    <Input
                      id="mainDiagnosis"
                      value={formData.mainDiagnosis}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mainDiagnosis: e.target.value,
                        })
                      }
                      placeholder="주 진단명을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">학력 (발병 전)</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      placeholder="예: 대학교 4학년 재학, 고졸 등"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="historyDiagnosis">병력 - 진단명</Label>
                    <Input
                      id="historyDiagnosis"
                      value={formData.historyDiagnosis}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          historyDiagnosis: e.target.value,
                        })
                      }
                      placeholder="과거 진단명을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="historyDate">병력 - 진단받은 시기</Label>
                    <Input
                      id="historyDate"
                      type="month"
                      value={formData.historyDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          historyDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="historyHospital">
                      병력 - 진단받은 병원
                    </Label>
                    <Input
                      id="historyHospital"
                      value={formData.historyHospital}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          historyHospital: e.target.value,
                        })
                      }
                      placeholder="병원명을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainSymptoms">주증상</Label>
                    <Input
                      id="mainSymptoms"
                      value={formData.mainSymptoms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mainSymptoms: e.target.value,
                        })
                      }
                      placeholder="주요 증상을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentHospital">
                      현재 주로 이용하는 병원
                    </Label>
                    <Input
                      id="currentHospital"
                      value={formData.currentHospital}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentHospital: e.target.value,
                        })
                      }
                      placeholder="현재 다니는 병원을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentResidence">현재 거주하는 장소</Label>
                    <Input
                      id="currentResidence"
                      value={formData.currentResidence}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentResidence: e.target.value,
                        })
                      }
                      placeholder="예: 본가, 그룹홈, 자립주택 등"
                    />
                  </div>

                  {/* 의료보장 */}
                  <div className="space-y-2 pt-2">
                    <Label>의료보장</Label>
                    <RadioGroup
                      value={formData.medicalCoverage}
                      onValueChange={(value: MedicalCoverage) =>
                        setFormData({ ...formData, medicalCoverage: value })
                      }
                      className="flex flex-wrap gap-4"
                    >
                      {Object.entries(MEDICAL_COVERAGE_LABELS).map(
                        ([value, label]) => (
                          <div
                            key={value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={value}
                              id={`medical-${value}`}
                            />
                            <Label
                              htmlFor={`medical-${value}`}
                              className="font-normal"
                            >
                              {label}
                            </Label>
                          </div>
                        ),
                      )}
                    </RadioGroup>
                  </div>

                  {/* 산정 특례 */}
                  <div className="space-y-3">
                    <Label>산정특례</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="specialCaseRegistered"
                        checked={formData.specialCaseRegistered}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            specialCaseRegistered: checked === true,
                            specialCaseRegisteredDate:
                              checked === true
                                ? formData.specialCaseRegisteredDate
                                : "",
                          })
                        }
                      />
                      <Label
                        htmlFor="specialCaseRegistered"
                        className="font-normal"
                      >
                        등록
                      </Label>
                    </div>

                    {formData.specialCaseRegistered && (
                      <div className="space-y-2">
                        <Label htmlFor="specialCaseRegisteredDate">
                          등록일
                        </Label>
                        <Input
                          id="specialCaseRegisteredDate"
                          type="date"
                          value={formData.specialCaseRegisteredDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialCaseRegisteredDate: e.target.value,
                            })
                          }
                          placeholder="등록일을 입력하세요"
                        />
                      </div>
                    )}
                  </div>

                  {/* 장애 등급 */}
                  <div className="space-y-3">
                    <Label>장애 등급</Label>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="disabilityRegistered"
                        checked={formData.disabilityRegistered}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            disabilityRegistered: checked === true,
                            disabilityStatus:
                              checked === true
                                ? formData.disabilityStatus
                                : "NOT_REGISTERED",
                            disabilityType:
                              checked === true ? formData.disabilityType : "",
                            disabilitySeverity:
                              checked === true
                                ? formData.disabilitySeverity
                                : "",
                          })
                        }
                      />
                      <Label
                        htmlFor="disabilityRegistered"
                        className="font-normal"
                      >
                        등록
                      </Label>
                    </div>

                    {formData.disabilityRegistered && (
                      <>
                        <div className="space-y-2">
                          <Label>진행 상태</Label>
                          <RadioGroup
                            value={formData.disabilityStatus}
                            onValueChange={(value: DisabilityStatus) =>
                              setFormData({
                                ...formData,
                                disabilityStatus: value,
                                disabilityType:
                                  value === "REGISTERED"
                                    ? formData.disabilityType
                                    : "",
                                disabilitySeverity:
                                  value === "REGISTERED"
                                    ? formData.disabilitySeverity
                                    : "",
                              })
                            }
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="REGISTERED"
                                id="disability-status-registered"
                              />
                              <Label
                                htmlFor="disability-status-registered"
                                className="font-normal"
                              >
                                등록
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="IN_PROGRESS"
                                id="disability-status-inprogress"
                              />
                              <Label
                                htmlFor="disability-status-inprogress"
                                className="font-normal"
                              >
                                진행 중
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="NOT_REGISTERED"
                                id="disability-status-notregistered"
                              />
                              <Label
                                htmlFor="disability-status-notregistered"
                                className="font-normal"
                              >
                                미등록
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {formData.disabilityStatus === "REGISTERED" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="disabilityType">종류</Label>
                              <Input
                                id="disabilityType"
                                value={formData.disabilityType}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    disabilityType: e.target.value,
                                  })
                                }
                                placeholder="예: 지체, 시각, 청각 등"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>정도</Label>
                              <RadioGroup
                                value={formData.disabilitySeverity}
                                onValueChange={(value: DisabilitySeverity) =>
                                  setFormData({
                                    ...formData,
                                    disabilitySeverity: value,
                                  })
                                }
                                className="flex flex-wrap gap-4"
                              >
                                <div className="flex items-center space-x-2 mt-2.5">
                                  <RadioGroupItem
                                    value="SEVERE"
                                    id="severity-severe"
                                  />
                                  <Label
                                    htmlFor="severity-severe"
                                    className="font-normal"
                                  >
                                    심한 장애
                                  </Label>
                                </div>

                                <div className="flex items-center space-x-2 mt-2.5">
                                  <RadioGroupItem
                                    value="NOT_SEVERE"
                                    id="severity-notsevere"
                                  />
                                  <Label
                                    htmlFor="severity-notsevere"
                                    className="font-normal"
                                  >
                                    심하지 않은 장애
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 사회복지서비스 (복수 선택) */}
                  <div className="space-y-3">
                    <Label>사회복지서비스</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(SOCIAL_WELFARE_LABELS).map(
                        ([key, label]) => {
                          const k = key as SocialWelfareService;
                          const checked =
                            formData.socialWelfareServices.includes(k);

                          return (
                            <div
                              key={k}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`service-${k}`}
                                checked={checked}
                                onCheckedChange={() => toggleSocialService(k)}
                              />
                              <Label
                                htmlFor={`service-${k}`}
                                className="font-normal"
                              >
                                {label}
                              </Label>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </section>
              )}

              <div className="space-y-3 pt-2">
                <Button type="submit" className="w-full" size="lg">
                  다음
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  이미 계정이 있으신가요?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                  >
                    로그인
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
