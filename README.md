# AIOApis Documentation
AIOApis is a flexible JavaScript class for managing API requests in React applications.

AIOApis component is indeed very useful and can greatly simplify the management of API requests in applications. It provides a centralized way to configure and handle API calls, reducing boilerplate code and making it easier to maintain and manage requests across an application.

## Here are some reasons why I believe AIOApis is beneficial:

- Centralized Configuration: With AIOApis, you can configure all your API requests in one place, making it easy to manage and update them as needed.
- Error Handling: AIOApis allows you to define error handling logic globally, reducing the need to handle errors in every individual request function.
- Loader Integration: It seamlessly integrates with loaders, allowing you to show loading indicators during API requests without duplicating code.
- Custom Messages: You can define custom error and success messages for each API request, providing better feedback to users.
- Caching: AIOApis supports caching of API responses, which can improve performance and reduce server load by serving cached responses when appropriate.
- Overall, I believe AIOApis is a creative and valuable tool that can greatly benefit applications by streamlining the process of making API requests and handling their responses. It promotes cleaner code, reduces redundancy, and improves the overall developer experience.

## Installation
You can install AIOApis via npm:
``` bash
npm install aio-apis
```
## Usage
1. Import the AIOApis class
javascript
``` javascript
import AIOApis from 'aio-apis';
```
2. Create an instance of AIOApis
``` javascript
const apisInstance = new AIOApis({
    id: 'my app',
    getError: (response) => {
        // Handle error messages
    },
    onCatch: (response) => {
        // Handle caught errors
    },
    loader: () => <MyLoader />,
    baseUrl: 'http://mydev.com/api/v1',
    apis: apiFunctions
});
```
3. Define API configurations
``` javascript
const apiFunctions = {
    Get_User: {
        method: 'get',
        description: 'get users',
        getUrl: (baseUrl) => `${baseUrl}/GetUsers`,
        // More configuration properties...
    },
    Add_User: {
        method: 'post',
        description: 'adding user',
        getUrl: (baseUrl) => `${baseUrl}/AddUser`,
        // More configuration properties...
    }
};
```
4. Call API request functions
``` javascript
import React, { useContext } from 'react';
import { AIOApisContext } from './AIOApisProvider';

const MyComponent = () => {
  const apisInstance = useContext(AIOApisContext);

  // Example usage of request function
  const getUsers = async () => {
    const users = await apisInstance.Get_User();
    console.log('Users:', users);
  };

  // Set error handling using onCatch and getError props
  apisInstance.onCatch((error) => {
    console.error('Error message:', error);
  });
  apisInstance.getError((error) => {
    console.error('Error message:', error);
  });

  return (
    <div>
      <button onClick={getUsers}>Get Users</button>
    </div>
  );
};

export default MyComponent;
```
## Configuration Properties

- `id` : Unique identifier for the application.
- `getError` : Function to handle errors caught during API requests.
- `onCatch` : Function to handle errors when requests are caught.
- `loader` : Function to render a loading indicator.
- `baseUrl` : Base URL for API requests.
- `apis` : Object containing definitions for individual API endpoints.

## API Configuration Properties
- `method`: HTTP method of the request.
- `description`: Description of the request.
- `getUrl`: Function to generate the complete URL of the request.
- `getBody`: Function to generate the request body.
- `getResult`: Function to process the response and return final data.
- `errorResult`: Default value to return in case of errors.
- `loading`: Flag to show loader during the request.
- `message`: Object containing error and success messages configuration.
- `cache`: Object containing properties for caching the request response.

## Message Property
The message property within each API configuration allows for customizing error and success messages:

- `error`: Specifies how error messages should be handled. It can be:
    - A boolean value (true or false) to control the display of auto-generated error messages.
    - A string value to set a custom error message.
    - A function that generates a custom error message based on the response.
- `success`: Specifies how success messages should be handled. It follows the same format as error.

## Cache Property
The cache property within each API configuration allows for caching the response of the request:

- `name`: A unique identifier for the cache entry.
- `time`: The duration for which the response will be cached, specified in milliseconds.



## mock class
the methods of the mock class named the same as the request functions allows for automatic mapping and invocation based on the requested API endpoint. Here are some additional points highlighting the benefits of this approach:

- Automatic Invocation: With methods named identically to the request functions, developers don't need to manually invoke mock methods based on the requested API endpoint. AIOApis handles this mapping automatically, reducing the likelihood of errors and simplifying the testing process.

- Consistency: By maintaining consistent naming between the request functions and mock methods, developers can easily identify which mock method corresponds to which API endpoint. This consistency improves code readability and comprehension, making it easier for developers to understand and maintain the codebase.

- Simplified Testing: Automatic invocation of mock methods based on the requested API endpoint streamlines the testing process. Developers can focus on defining the behavior of mock methods without worrying about how they will be called during testing. This simplification accelerates the testing cycle and enables more comprehensive test coverage.

- Flexibility: The automatic mapping of mock methods based on request function names provides flexibility in defining mock behavior. Developers can easily create mock responses tailored to specific API endpoints, allowing them to simulate various scenarios and edge cases during testing without extra configuration or setup.

- Reduced Boilerplate: Eliminating the need for manual mapping or configuration between request functions and mock methods reduces boilerplate code and simplifies the overall testing setup. Developers can focus on defining mock behavior without being burdened by unnecessary setup or maintenance tasks.








