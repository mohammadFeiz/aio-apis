# AIO-APIs 🚀

**AIO-APIs** is a lightweight and efficient micro-framework for managing API requests in JavaScript and TypeScript applications. It simplifies HTTP requests with built-in caching, error handling, loading indicators, and mock requests.

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

### 1️⃣ **Setting up AIO-APIs**

Create a class that extends \`AIOApis\` and configure the API settings.

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
        const { response, success } = await this.request<{ data: I_user[] }>({
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

```typescript
await apis.request({
    name: 'getUsers',
    url: '/api/users',
    method: 'get',
    cache: { name: 'users', expiredIn: Date.now() + 60000 }
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

```typescript
apis.showMessage('success', 'Operation completed successfully');
apis.showMessage('info', 'New information received');
apis.showMessage('warning', 'Warning: Data may be outdated');
apis.showMessage('error', 'Error connecting to server');
```

---

### 🔄 **5. Retry Mechanism**
Automatically retry failed requests:

```typescript
retries: [3000, 4000, 5000]
```

---

### ⏳ **6. Auto Loading Management**
Enable automatic loading indicators:

```typescript
await apis.request({
    name: 'fetchData',
    url: '/api/data',
    method: 'get',
    showLoading: true
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
