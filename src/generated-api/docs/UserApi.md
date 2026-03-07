# UserApi

All URIs are relative to *https://diary-api.snuh-bmilab.ai.kr*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMe**](UserApi.md#getme) | **GET** /v1/users/me | 현재 사용자 정보 조회 |
| [**register**](UserApi.md#register) | **POST** /v1/users/register | 회원가입 |
| [**searchCareManagers**](UserApi.md#searchcaremanagers) | **GET** /v1/users/care-managers | 담당 관리자 목록 조회 |



## getMe

> CommonResponseCurrentUserResponse getMe()

현재 사용자 정보 조회

현재 로그인한 사용자의 상세 정보를 조회합니다.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { GetMeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  try {
    const data = await api.getMe();
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

[**CommonResponseCurrentUserResponse**](CommonResponseCurrentUserResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 사용자 정보 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |
| **404** | 사용자를 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## register

> CommonResponseUserRegisterResponse register(userRegisterRequest)

회원가입

OAuth2 인증 후 사용자 상세 정보를 등록합니다. 이름, 역할, 성별, 생년월일, 주소 및 의료 관련 정보를 포함합니다.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { RegisterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // UserRegisterRequest
    userRegisterRequest: ...,
  } satisfies RegisterRequest;

  try {
    const data = await api.register(body);
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
| **userRegisterRequest** | [UserRegisterRequest](UserRegisterRequest.md) |  | |

### Return type

[**CommonResponseUserRegisterResponse**](CommonResponseUserRegisterResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 사용자 등록 성공 |  -  |
| **400** | 잘못된 요청 |  -  |
| **401** | 인증 실패 |  -  |
| **409** | 이미 등록된 사용자 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchCareManagers

> CommonResponseCareManagerFindAllResponse searchCareManagers(search)

담당 관리자 목록 조회

Role이 CARE_MANAGER인 사용자를 이름으로 검색합니다. search가 비어있으면 전체 목록을 반환합니다.

### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { SearchCareManagersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: JWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // string (optional)
    search: search_example,
  } satisfies SearchCareManagersRequest;

  try {
    const data = await api.searchCareManagers(body);
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
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**CommonResponseCareManagerFindAllResponse**](CommonResponseCareManagerFindAllResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 담당 관리자 목록 조회 성공 |  -  |
| **401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

