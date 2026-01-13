
# ScaleQuestionResultDto

척도 질문 결과 정보

## Properties

Name | Type
------------ | -------------
`scaleCategory` | string
`scaleScore` | number
`questions` | [Array&lt;ScaleQuestionItemDto&gt;](ScaleQuestionItemDto.md)

## Example

```typescript
import type { ScaleQuestionResultDto } from ''

// TODO: Update the object below with actual values
const example = {
  "scaleCategory": ANXIETY,
  "scaleScore": 15,
  "questions": null,
} satisfies ScaleQuestionResultDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScaleQuestionResultDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


