
# WordCloudItemDto

워드클라우드 단어 항목

## Properties

Name | Type
------------ | -------------
`word` | string
`count` | number

## Example

```typescript
import type { WordCloudItemDto } from ''

// TODO: Update the object below with actual values
const example = {
  "word": 병원,
  "count": 32,
} satisfies WordCloudItemDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WordCloudItemDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


