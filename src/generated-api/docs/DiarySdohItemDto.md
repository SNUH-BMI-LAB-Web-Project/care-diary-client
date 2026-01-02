
# DiarySdohItemDto

일기 SDOH 항목 정보

## Properties

Name | Type
------------ | -------------
`elementNo` | number
`majorCat` | string
`middleCat` | string
`subCat` | string
`signCode` | string
`typeLabel` | string
`severity` | number
`duration` | number
`coping` | number
`recommendation` | string
`evidences` | Array&lt;string&gt;

## Example

```typescript
import type { DiarySdohItemDto } from ''

// TODO: Update the object below with actual values
const example = {
  "elementNo": 1,
  "majorCat": 경제적 안정,
  "middleCat": 고용,
  "subCat": 실업,
  "signCode": ES001,
  "typeLabel": 경제적 어려움,
  "severity": 3,
  "duration": 4,
  "coping": 2,
  "recommendation": 취업 지원 서비스 연결 필요,
  "evidences": [실직 상태가 6개월째 지속되고 있다, 생활비가 부족하여 어려움을 겪고 있다],
} satisfies DiarySdohItemDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiarySdohItemDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


