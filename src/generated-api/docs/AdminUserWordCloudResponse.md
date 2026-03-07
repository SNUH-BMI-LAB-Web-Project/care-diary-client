
# AdminUserWordCloudResponse

관리자 사용자 워드클라우드 조회 결과

## Properties

Name | Type
------------ | -------------
`userId` | string
`totalDiaries` | number
`totalTokens` | number
`items` | [Array&lt;WordCloudItemDto&gt;](WordCloudItemDto.md)

## Example

```typescript
import type { AdminUserWordCloudResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": 550e8400-e29b-41d4-a716-446655440000,
  "totalDiaries": 30,
  "totalTokens": 2150,
  "items": null,
} satisfies AdminUserWordCloudResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUserWordCloudResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


