
# AdminDiaryKeywordResponse

관리자 일기 키워드 조회 응답

## Properties

Name | Type
------------ | -------------
`diaryId` | string
`keywords` | [Array&lt;DiaryKeywordDto&gt;](DiaryKeywordDto.md)

## Example

```typescript
import type { AdminDiaryKeywordResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "diaryId": 550e8400-e29b-41d4-a716-446655440000,
  "keywords": null,
} satisfies AdminDiaryKeywordResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminDiaryKeywordResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


