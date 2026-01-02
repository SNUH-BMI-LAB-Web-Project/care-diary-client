import {
  UserRegisterRequestGenderEnum,
  UserRegisterRequestMedicalCoverageEnum,
  UserRegisterRequestDisabilityStatusEnum,
  UserRegisterRequestDisabilitySeverityEnum,
} from "@/generated-api";

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
