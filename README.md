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

## 📌 Usage

### 1️⃣ **Setting up aio-apis**

Create a class that extends \`aio-apis\` and configure the API settings.

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
            url: '/api/users',
            cache: { name: 'users', expiredIn: Date.now() + 30000 },
            mock: { delay: 2000, methodName: 'mockSuccess' },
            retries: [3000, 4000, 5000],
            showLoading: true
        });
        return success ? response.data : false;
    };
}

const apis = new APIS();
apis.getUsers().then(users => console.log(users));
```

---

## 🔹 API Configuration

Each request follows this structure:

```typescript
type AA_api = {
    name: string;
    method: 'post' | 'get' | 'delete' | 'put' | 'patch';
    url: string;
    body?: any;
    cache?: { name: string; expiredIn?: number };
    mock?: { delay: number; methodName: string };
    headers?: any;
    token?: string;
    showError?: boolean;
    showLoading?: boolean;
    retries?: number[];
};
```

## 📌 Advanced Features

### 🗃 **1. Caching System**
Enable caching to avoid redundant API calls.

- Structure
```typescript
cache?: { name: string, expiredIn?: number }
```
- Explaination:
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

### 🛠 **2. Mocking API Requests**
Test API calls without a real backend by using mock responses.

```typescript
mock: { delay: 2000, methodName: 'mockSuccess' }
```

---

### 🚨 **3. Error Handling**
Define how errors should be displayed:

```typescript
handleErrorMessage: (response) => response.response.data.message
```

---

### 💬 **4. Message Display**
Show different types of messages:
- Display different types of messages using addAlert. This can be called from anywhere that has access to the instantiated API object:
```typescript
apis.addAlert({type:'success', text:'Operation completed successfully',title:'Success'});
apis.addAlert({type:'info', text:'New information received',title:''});
apis.addAlert({type:'warning', text:'Warning: Data may be outdated',title:''});
apis.addAlert({type:'error', text:'Error connecting to server',title:''});
```

---

### 🔄 **5. Retry Mechanism**
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

### ⏳ **6. Auto Loading Management**
Enable automatic loading indicators ( **default is true** ) :

```typescript
await this.request({
    loading: true
});
```

---

## 📚 Documentation
For full documentation, visit: [GitHub Repository](https://github.com/your-repo)

---

## 🛠 Contributing
Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md).

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
