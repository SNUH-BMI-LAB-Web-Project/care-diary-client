# AdminUserApi

All URIs are relative to *https://diary-api.snuh-bmilab.ai.kr*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**findAllUsers**](AdminUserApi.md#findallusers) | **GET** /v1/admin/users | 전체 사용자 목록 조회 |
| [**findScaleQuestionResult**](AdminUserApi.md#findscalequestionresult) | **GET** /v1/admin/users/{userId}/scale-questions | 사용자 척도 설문 답변 조회 |
| [**findUserById**](AdminUserApi.md#finduserbyid) | **GET** /v1/admin/users/{userId} | 사용자 상세 조회 |
| [**findUserScales**](AdminUserApi.md#finduserscales) | **GET** /v1/admin/users/{userId}/scales | 사용자 척도 점수 조회 |
| [**findUserWordCloud**](AdminUserApi.md#finduserwordcloud) | **GET** /v1/admin/users/{userId}/wordcloud | 사용자 워드클라우드 조회 |



## findAllUsers

> CommonResponseAdminUserFindAllResponse findAllUsers()

전체 사용자 목록 조회

시스템에 등록된 모든 사용자의 목록을 조회합니다.

### Example

```ts
import {
  Configuration,
  AdminUserApi,
} from '';
import type { FindAllUsersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminUserApi(config);

  try {
    const data = await api.findAllUsers();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**CommonResponseAdminUserFindAllResponse**](CommonResponseAdminUserFindAllResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 사용자 목록 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |
| **403** | 권한 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findScaleQuestionResult

> CommonResponseAdminUserScaleQuestionResultResponse findScaleQuestionResult(userId, count)

사용자 척도 설문 답변 조회

특정 사용자의 특정 회차 척도 질문에 대한 응답 결과를 조회합니다.

### Example

```ts
import {
  Configuration,
  AdminUserApi,
} from '';
import type { FindScaleQuestionResultRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminUserApi(config);

  const body = {
    // string | 사용자 ID
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number | 조회할 회차
    count: 1,
  } satisfies FindScaleQuestionResultRequest;

  try {
    const data = await api.findScaleQuestionResult(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | 사용자 ID | [Defaults to `undefined`] |
| **count** | `number` | 조회할 회차 | [Defaults to `undefined`] |

### Return type

[**CommonResponseAdminUserScaleQuestionResultResponse**](CommonResponseAdminUserScaleQuestionResultResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 척도 질문 응답 조회 성공 |  -  |
| **400** | 잘못된 요청 (유효하지 않은 회차) |  -  |
| **401** | 인증 실패 |  -  |
| **403** | 권한 없음 |  -  |
| **404** | 사용자 또는 응답을 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findUserById

> CommonResponseAdminUserDetailResponse findUserById(userId)

사용자 상세 조회

특정 사용자의 상세 정보를 조회합니다.

### Example

```ts
import {
  Configuration,
  AdminUserApi,
} from '';
import type { FindUserByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminUserApi(config);

  const body = {
    // string | 사용자 ID
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies FindUserByIdRequest;

  try {
    const data = await api.findUserById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | 사용자 ID | [Defaults to `undefined`] |

### Return type

[**CommonResponseAdminUserDetailResponse**](CommonResponseAdminUserDetailResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 사용자 상세 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |
| **403** | 권한 없음 |  -  |
| **404** | 사용자를 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findUserScales

> CommonResponseAdminUserScaleFindAllResponse findUserScales(userId)

사용자 척도 점수 조회

특정 사용자의 모든 척도 측정 결과를 조회합니다.

### Example

```ts
import {
  Configuration,
  AdminUserApi,
} from '';
import type { FindUserScalesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminUserApi(config);

  const body = {
    // string | 사용자 ID
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies FindUserScalesRequest;

  try {
    const data = await api.findUserScales(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | 사용자 ID | [Defaults to `undefined`] |

### Return type

[**CommonResponseAdminUserScaleFindAllResponse**](CommonResponseAdminUserScaleFindAllResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 척도 결과 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |
| **403** | 권한 없음 |  -  |
| **404** | 사용자를 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findUserWordCloud

> CommonResponseAdminUserWordCloudResponse findUserWordCloud(userId)

사용자 워드클라우드 조회

특정 사용자의 일기에서 추출한 워드클라우드 데이터를 조회합니다.

### Example

```ts
import {
  Configuration,
  AdminUserApi,
} from '';
import type { FindUserWordCloudRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminUserApi(config);

  const body = {
    // string | 사용자 ID
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies FindUserWordCloudRequest;

  try {
    const data = await api.findUserWordCloud(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | 사용자 ID | [Defaults to `undefined`] |

### Return type

[**CommonResponseAdminUserWordCloudResponse**](CommonResponseAdminUserWordCloudResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 워드클라우드 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |
| **403** | 권한 없음 |  -  |
| **404** | 사용자를 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

