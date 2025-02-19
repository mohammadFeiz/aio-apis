# aio-apis 🚀

**aio-apis** is a lightweight and efficient micro-framework for managing API requests in JavaScript and TypeScript applications. It simplifies HTTP requests with built-in caching, error handling, loading indicators, and mock requests.

---

## 📦 Installation

```sh
npm install aio-apis
```

or

```sh
yarn add aio-apis
```

---

## 🚀 Features

- ✅ **Standard HTTP Requests** (GET, POST, PUT, DELETE, PATCH)
- ✅ **Automatic Caching** to prevent duplicate requests
- ✅ **Mock API Support** for testing without a backend
- ✅ **Error Handling** with customizable messages
- ✅ **Automatic Loading Indicators**
- ✅ **Retry Mechanism** for failed requests

---

## 🚀 Why is aio-apis Useful?

- ✅ **Modular Structure** API requests are organized within a single class.
- ✅ **Reusability** Centralized API requests can be used across the entire application.
- ✅ **Performance Optimization** Caching and the retry mechanism improve network request efficiency.
- ✅ **Simplicity & Readability** Inheriting from AIOApis keeps the code clean and structured.

If you want to manage API requests in a typed and organized way, aio-apis is an excellent choice. 🚀

## 📌 Usage

### Creating a Class Inheriting from `aio-apis`
- In aio-apis, API requests are structured as typed **methods** within a **class** that inherits from `AIOApis`. This allows for centralized request management, ensuring each API request follows a structured approach.
- To create an API management class, we define a class that **extends** `AIOApis`. Inside the constructor, we pass essential configuration properties to **super()**. These settings define how all requests in this class will behave.
- The generic type allows us to define the expected response structure, ensuring type safety and better code completion.The generic type defines the method's return type, ensuring the response matches the expected structure.
#### Example

```typescript
import AIOApis from 'aio-apis';

type I_user = { name: string; family: string };

class APIS extends AIOApis {
    constructor() {
        super({
            id: 'my-api',
            token: 'your-token',
            handleErrorMessage: (response) => response.response.data.message
        });
    }

    getUsers = async () => {
        const { response, success,errorMessage } = await this.request<{ data: I_user[] }>({
            name: 'getUsers',
            description: 'Retrieve user list',
            method: 'get',
            url: '/api/users'
        });
        return success ? response.data : false;
    };
}
```
- ⚠ In this example, we defined a request method called getUsers, which can be called from anywhere in the application that has access to the Apis instance.
- ⚠ We pass the API specifications to this.request. Therefore, to manage each API, we need to handle the object that we send to this.request properly.
- ⚠ `this.request` always returns an object containing response, success, and errorMessage, so we can use it to build the API result and decide what to return if success is false.

#### Create an Instance:
```typescript
const apis = new APIS();
```
#### Use Class Methods (by created class instance):
```typescript
const users = await apis.getUsers();
if(users){
    //use result in app
}
```

### 🔍 Code Analysis
- The `APIS` class inherits from AIOApis imported from 'aio-apis'.
- In the `super()` constructor, global API settings such as token and handleErrorMessage are initialized.
- The `getUsers()` method sends a GET request and returns the user data if the request is successful or false in fail.
## Breakdown of Constructor Properties

Property | Type | Description
-------- | ---- | -----------
id | string | A unique identifier for the API instance. Helps in isolate caches.
token | string | Authorization token used for authenticated requests.
lang | 'en' or 'fa'. default is 'en' (Optional) | Language setting for requests, useful for localization.
handleErrorMessage | (response) => string | A function that extracts and returns the error message from the server response.

```typescript
constructor() {
    super({
        id: 'my-api',
        token: 'your-token',
        handleErrorMessage: (response) => response.response.data.message
    });
}
```
---

## 🔹 API Configuration

Each request follows this structure:

```typescript
type api_type = {
    name: string; //required . unique name of api 
    method: 'post' | 'get' | 'delete' | 'put' | 'patch';
    url: string;
    body?: any; //required if method is post
    cache?: { name: string; expiredIn?: number }; //cache result by defined name
    mock?: { delay: number; methodName: string }; // mock response
    headers?: any; //set custom headers for request
    token?: string; 
    showError?: boolean; //Optional. default is true. use for prevent show error message automatically
    loading?: boolean; //Optional. default is true.
    retries?: number[]; // Optional. milisecond times foer retry in fail
};
```
Property | type | default | Description
-------- | ---- | ------- | -----------
name     | string | Required | unique name of api 
method   | 'get' or 'post' or 'delete' or 'patch' or 'put' | Required | Define request method 
url | string | Required | Request URL
body | any | required if method is post | request body
cache | { name: string; expiredIn?: number } | Optional | save result in cache to prevent repeat request
mock | (requestConfig)=>{status:number,data:any} | Optional | mock response
mockDelay | number | 3000 | simulate request delay in mock mode
headers | any | Optional | set custom headers for request
token | string | Required | Authorization token 
showError | boolean | true | use for prevent show error message automatically
loading | boolean | true | automatically show loading indicator during requests.
retries | number[] | Optional | Optional. milisecond times foer retry in fail

---


## 📌 Features Explaination

### 🗃 **Caching System**
Enable caching to avoid redundant API calls.

```typescript
cache?: { name: string, expiredIn?: number }
```
- `name` : A unique identifier for caching the request response. This allows different caches for the same request by using different names.
- `expiredIn` :  (Optional) The expiration timestamp in milliseconds. If set, the cache remains valid until the given timestamp.

- Usage Example:

```typescript
const {response,success,errorMessage} = await apis.request({
    ...
    cache: {
        name: 'users',
        expiredIn: Date.now() + (24 * 60 * 60 * 1000)
    }
    ...
});
```
---

### 🛠 **Mocking API Requests**
Test API calls without a real backend by using mock responses.

```typescript
mock: { delay: 2000, methodName: 'mockSuccess' }
```
```typescript
class Apis extends AIOApis {
    ...
    mockResult = () => {
        return { status: 400, data: { message: 'you cannot do this action' } }
    }
    getUsers = async () => {
        const {response,success} = await this.request<{data:I_user[]}>({
            ...
            mock: this.mockResult,
            mockDelay:3000,
            ...
        })
        ...
    }
}
```
---

### 🔄 **Retry Mechanism**
Automatically retry failed requests:
- The retries option allows automatic reattempts when a request fails. Each value in the retries array represents the delay in milliseconds before the next retry attempt.

```typescript
retries: number[]
```

```typescript
const {response,success,errorMessage} = await this.request({
    ...
    retries: [3000, 4000, 5000]
    ...
});
```

---

### ⏳ **Auto Loading Management**
Automatically show loading status during requests and hide it afterward: ( **default is true** ) :

```typescript
const {response,success,errorMessage} = await this.request({
    ...
    loading: true,
    ...
});
```

---

## 🔔 Usefull Class Methods

### 💬 **Message Display(addAlert)**
Show different types of messages:
- Display different types of messages using addAlert. This can be called from anywhere that has access to the instantiated API object:
```typescript
apis.addAlert({type:'success', text:'Operation completed successfully',title:'Success'});
apis.addAlert({type:'info', text:'New information received',title:''});
apis.addAlert({type:'warning', text:'Warning: Data may be outdated',title:''});
apis.addAlert({type:'error', text:'Error connecting to server',title:''});
```

### 🛠 **Cache Management**
#### `fetchCachedValue` method
- Retrieves a cached value by api name and cache name, refreshing it if expired.

```typescript
(apiName:string,cacheName:string)=>void
```

```typescript
await apis.fetchCachedValue('getUsers','users');
```

#### `getCachedValue` method
- get specific cache value defined with `api name` and `cache name`.
- this will returns cached response of request
```typescript
(apiName:string,cacheName:string)=>any
```

```typescript
const response = await apis.getCachedValue('getUsers','users');
```
#### `removeCache` method
- Removes a cached entry by `api name` and `cache name`.
```typescript
(apiName:string,cacheName:string)=>any
```

```typescript
await apis.removeCache('users');
```

