import { Frown, Heart, Smile } from "lucide-react";

export type Emotion = "HAPPY" | "LOVE" | "SAD";
export type Gender = "MALE" | "FEMALE";
export type ScaleType = "ANXIETY" | "DEPRESSION" | "ANGER";

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

export const ScaleType = {
  ANXIETY: "ANXIETY" as const,
  DEPRESSION: "DEPRESSION" as const,
  ANGER: "ANGER" as const,
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

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.USER]: "사용자",
  [UserRole.ADMIN]: "관리자",
};

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: "남성",
  [Gender.FEMALE]: "여성",
};

export const SCALE_LABELS: Record<ScaleType, string> = {
  [ScaleType.ANXIETY]: "불안",
  [ScaleType.DEPRESSION]: "우울",
  [ScaleType.ANGER]: "분노",
};

export const INITIAL_QUESTIONS = [
  "무엇이 가장 어려운가요?",
  "무엇이 두려운가요?",
  "어떤 도움이 필요한가요?",
] as const;

export const REFLECTION_QUESTIONS = [
  "당신의 가장 깊은 내면의 생각과 감정들을 어느 정도 표현했나요?",
  "오늘의 경험이 당신에게 얼마나 의미있었나요?",
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
    SESSION: "회기",
    SCORE: "점수",
    EMPTY_STATE: "아직 데이터가 없습니다",
  },
} as const;
