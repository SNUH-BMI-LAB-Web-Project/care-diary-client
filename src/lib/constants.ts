import { Frown, Heart, Smile } from "lucide-react";
import {
  UserRegisterRequestGenderEnum,
  UserRegisterRequestMedicalCoverageEnum,
  UserRegisterRequestDisabilityStatusEnum,
  UserRegisterRequestDisabilitySeverityEnum,
} from "@/generated-api";

export type Emotion = "HAPPY" | "LOVE" | "SAD";
export type Gender = "MALE" | "FEMALE";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const Emotion = {
  HAPPY: "HAPPY" as const,
  LOVE: "LOVE" as const,
  SAD: "SAD" as const,
};

export const Gender = {
  MALE: "MALE" as const,
  FEMALE: "FEMALE" as const,
};

export const EMOTION_LABELS: Record<Emotion, string> = {
  [Emotion.HAPPY]: "행복",
  [Emotion.LOVE]: "사랑",
  [Emotion.SAD]: "슬픔",
};

export const EMOTION_CONFIG = {
  [Emotion.HAPPY]: {
    icon: Smile,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    selectedBg: "bg-green-500/20",
    border: "border-green-500",
  },
  [Emotion.LOVE]: {
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    selectedBg: "bg-pink-500/20",
    border: "border-pink-500",
  },
  [Emotion.SAD]: {
    icon: Frown,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    selectedBg: "bg-purple-500/20",
    border: "border-purple-500",
  },
};

export const REFLECTION_QUESTIONS = [
  "당신의 가장 깊은 내면의 생각과 감정들을 어느 정도 표현했나요?",
  "당신의 현재 느끼는 슬픔은 어느 정도인가요?",
  "당신의 현재 느끼는 분노는 어느 정도인가요?",
  "당신이 현재 느끼는 행복감은 어느 정도인가요?",
  "오늘의 글쓰기가 어느 정도 당신에게 가치있고 의미있는 일이었나요?",
  "이후에 참고할 수 있도록 오늘의 글쓰기에 점수를 매긴다면 어느 정도인가요?",
] as const;

export const UI_TEXT = {
  HOME: {
    TODAY_QUESTION: "오늘의 질문",
    RECOMMENDED: "당신을 위한 추천 서비스",
    THIS_MONTH: "이달의 일기",
    THIS_YEAR: "올해의 일기",
    EMOTION_DISTRIBUTION: "감정 분포",
  },
  DIARY: {
    SELECT_EMOTION: "오늘의 감정을 선택해주세요",
    WRITE_CONTENT: "오늘 하루는 어땠나요?",
    REFLECTION_MIN: "전혀",
    REFLECTION_MAX: "매우",
  },
  GRAPHS: {
    TITLE: "척도 분석",
    SESSION: "차수",
    SCORE: "점수",
    EMPTY_STATE: "아직 데이터가 없습니다",
  },
} as const;

export type SocialWelfareService =
  | "CAREGIVER_COST"
  | "SPECIAL_DIET_PURCHASE"
  | "DISABILITY_ALLOWANCE"
  | "DISABLED_CHILD_ALLOWANCE"
  | "DISABILITY_PENSION"
  | "NATIONAL_PENSION_DISABILITY_PENSION"
  | "BASIC_PENSION";

export const SOCIAL_WELFARE_LABELS: Record<SocialWelfareService, string> = {
  CAREGIVER_COST: "간병비",
  SPECIAL_DIET_PURCHASE: "특수 식이 구입비",
  DISABILITY_ALLOWANCE: "장애수당",
  DISABLED_CHILD_ALLOWANCE: "장애아동수당",
  DISABILITY_PENSION: "장애인 연금",
  NATIONAL_PENSION_DISABILITY_PENSION: "국민연금 내 장애 연금",
  BASIC_PENSION: "기초연금",
};

export const GENDER_LABELS: Record<UserRegisterRequestGenderEnum, string> = {
  [UserRegisterRequestGenderEnum.Male]: "남성",
  [UserRegisterRequestGenderEnum.Female]: "여성",
};

export const MEDICAL_COVERAGE_LABELS: Record<
  UserRegisterRequestMedicalCoverageEnum,
  string
> = {
  [UserRegisterRequestMedicalCoverageEnum.HealthInsurance]: "건강보험",
  [UserRegisterRequestMedicalCoverageEnum.MedicalAid1]: "의료급여 1종",
  [UserRegisterRequestMedicalCoverageEnum.MedicalAid2]: "의료급여 2종",
  [UserRegisterRequestMedicalCoverageEnum.NearPoor1]: "차상위 1종",
  [UserRegisterRequestMedicalCoverageEnum.NearPoor2]: "차상위 2종",
};

export const DISABILITY_STATUS_LABELS: Record<
  UserRegisterRequestDisabilityStatusEnum,
  string
> = {
  [UserRegisterRequestDisabilityStatusEnum.Registered]: "등록",
  [UserRegisterRequestDisabilityStatusEnum.InProgress]: "진행 중",
  [UserRegisterRequestDisabilityStatusEnum.NotRegistered]: "미등록",
};

export const DISABILITY_SEVERITY_LABELS: Record<
  UserRegisterRequestDisabilitySeverityEnum,
  string
> = {
  [UserRegisterRequestDisabilitySeverityEnum.Severe]: "심한 장애",
  [UserRegisterRequestDisabilitySeverityEnum.NotSevere]: "심하지 않은 장애",
};

export const PROVIDER_LABELS: Record<"google" | "naver" | "kakao", string> = {
  google: "구글",
  naver: "네이버",
  kakao: "카카오",
};
