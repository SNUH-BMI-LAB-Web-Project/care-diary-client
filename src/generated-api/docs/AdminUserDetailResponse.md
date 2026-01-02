
# AdminUserDetailResponse

관리자 사용자 상세 조회 응답

## Properties

Name | Type
------------ | -------------
`userId` | string
`name` | string
`birthDate` | Date
`primaryDiagnosis` | string
`diaryDates` | Array&lt;Date&gt;
`monthlyDiaryCount` | number
`yearlyDiaryCount` | number
`emotionCounts` | { [key: string]: number; }
`riskReason` | string

## Example

```typescript
import type { AdminUserDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": 550e8400-e29b-41d4-a716-446655440000,
  "name": 홍길동,
  "birthDate": 1990-01-15,
  "primaryDiagnosis": 조현병,
  "diaryDates": [2024-01-15, 2024-01-20, 2024-01-25],
  "monthlyDiaryCount": 12,
  "yearlyDiaryCount": 85,
  "emotionCounts": {HAPPY=30, LOVE=25, SAD=30},
  "riskReason": 최근 2주간 부정적 감정 일기 비율 증가,
} satisfies AdminUserDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUserDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


