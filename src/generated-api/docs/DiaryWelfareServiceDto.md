
# DiaryWelfareServiceDto

일기 복지 서비스 정보

## Properties

Name | Type
------------ | -------------
`welfareServiceId` | number
`serviceScope` | string
`serviceId` | string
`serviceName` | string
`serviceDetailLink` | string
`serviceDigest` | string
`adminLevel1Name` | string
`adminLevel2Name` | string
`matchedLifeCycleKeywords` | Array&lt;string&gt;
`matchedHouseholdStatusKeywords` | Array&lt;string&gt;
`matchedInterestKeywords` | Array&lt;string&gt;
`visible` | boolean

## Example

```typescript
import type { DiaryWelfareServiceDto } from ''

// TODO: Update the object below with actual values
const example = {
  "welfareServiceId": 1,
  "serviceScope": CENTRAL,
  "serviceId": WS2024001,
  "serviceName": 정신건강복지센터 상담 서비스,
  "serviceDetailLink": https://www.bokjiro.go.kr/service/12345,
  "serviceDigest": 정신건강 상담 및 사례관리 서비스를 제공합니다.,
  "adminLevel1Name": 서울특별시,
  "adminLevel2Name": 강남구,
  "matchedLifeCycleKeywords": [청년, 중장년],
  "matchedHouseholdStatusKeywords": [1인 가구, 저소득층],
  "matchedInterestKeywords": [정신건강, 심리상담],
  "visible": true,
} satisfies DiaryWelfareServiceDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiaryWelfareServiceDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


