
# CareManagerFindAllResponse

담당 관리자 목록 응답

## Properties

Name | Type
------------ | -------------
`careManagers` | [Array&lt;CareManagerResponse&gt;](CareManagerResponse.md)

## Example

```typescript
import type { CareManagerFindAllResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "careManagers": null,
} satisfies CareManagerFindAllResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CareManagerFindAllResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


