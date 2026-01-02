
# ScaleQuestionItemDto

척도 질문 항목 정보

## Properties

Name | Type
------------ | -------------
`questionNumber` | number
`questionText` | string
`selectedOption` | string

## Example

```typescript
import type { ScaleQuestionItemDto } from ''

// TODO: Update the object below with actual values
const example = {
  "questionNumber": 1,
  "questionText": 지난 2주 동안 불안감을 느낀 적이 있습니까?,
  "selectedOption": 가끔 그렇다,
} satisfies ScaleQuestionItemDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScaleQuestionItemDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


