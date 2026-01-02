
# DiaryKeywordDto

일기 키워드 정보

## Properties

Name | Type
------------ | -------------
`keywordExtractionId` | number
`keywordGroup` | string
`keyword` | string
`keywordCode` | string
`evidences` | Array&lt;string&gt;

## Example

```typescript
import type { DiaryKeywordDto } from ''

// TODO: Update the object below with actual values
const example = {
  "keywordExtractionId": 1,
  "keywordGroup": LIFE_CYCLE,
  "keyword": 청년,
  "keywordCode": LC001,
  "evidences": [취업 준비를 하고 있다, 청년 주거 지원이 필요하다],
} satisfies DiaryKeywordDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiaryKeywordDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


