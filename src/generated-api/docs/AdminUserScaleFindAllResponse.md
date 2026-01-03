
# AdminUserScaleFindAllResponse

관리자 사용자 척도 결과 조회 응답

## Properties

Name | Type
------------ | -------------
`items` | { [key: string]: Array&lt;UserScaleItem&gt;; }

## Example

```typescript
import type { AdminUserScaleFindAllResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "items": {1=[{scaleCategory=ANXIETY_DEPRESSION, score=8, createdAt=2024-01-15T10:30:00}], 2=[{scaleCategory=ANGER, score=10, createdAt=2024-02-15T10:30:00}]},
} satisfies AdminUserScaleFindAllResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUserScaleFindAllResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


