
# AdminDiaryWelfareServiceResponse

관리자 일기 복지 서비스 조회 응답

## Properties

Name | Type
------------ | -------------
`diaryId` | string
`welfareServices` | [Array&lt;DiaryWelfareServiceDto&gt;](DiaryWelfareServiceDto.md)

## Example

```typescript
import type { AdminDiaryWelfareServiceResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "diaryId": 550e8400-e29b-41d4-a716-446655440000,
  "welfareServices": null,
} satisfies AdminDiaryWelfareServiceResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminDiaryWelfareServiceResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


