import type {
  UserRole,
  Gender,
  DisabilitySeverity,
  DisabilityStatus,
  MedicalCoverage,
  SocialWelfareService,
} from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  age: number;
  role: UserRole;
  adminKey?: string;
  createdAt: Date;
}

export interface RiskInfo {
  isRisk: boolean;
  reason: string;
}

export interface AnxietyResponse {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  q13: number;
  q14: number;
}

export interface DepressionResponse {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  q13: number;
  q14: number;
  q15: number;
  q16: number;
  q17: number;
  q18: number;
  q19: number;
  q20: number;
}

export interface AngerResponse {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  q13: number;
  q14: number;
  q15: number;
  q16: number;
  q17: number;
  q18: number;
  q19: number;
  q20: number;
  q21: number;
  q22: number;
  q23: number;
  q24: number;
}

export type RegisterFormData = {
  // 기본 정보 - 필수 입력
  name: string;
  email: string;
  gender: Gender;
  birth: string;
  address: string;
  role: UserRole;

  // 기본 정보 - 선택 입력
  religion: string;
  educationJob: string;

  // 환자 정보
  mainDiagnosis: string;
  education: string;
  historyDiagnosis: string;
  historyDate: string;
  historyHospital: string;
  mainSymptoms: string;
  currentHospital: string;
  currentResidence: string;

  // 의료보장
  medicalCoverage: MedicalCoverage;

  // 산정특례
  specialCaseRegistered: boolean;
  specialCaseRegisteredDate: string;

  // 장애등급
  disabilityRegistered: boolean; // "등록" 체크박스 역할
  disabilityStatus: DisabilityStatus; // 등록(종류)/진행중/미등록 중 택1
  disabilityType: string; // 등록(종류:)
  disabilitySeverity: DisabilitySeverity; // 심한/심하지 않은

  // 사회복지서비스 (복수 선택)
  socialWelfareServices: SocialWelfareService[];
};
