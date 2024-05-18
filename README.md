AIOApis Documentation
AIOApis is a flexible JavaScript class for managing API requests in React applications.

Installation
You can install AIOApis via npm:

bash
Copy code
npm install aio-apis
Usage
1. Import the AIOApis class
javascript
Copy code
import AIOApis from 'aio-apis';
2. Create an instance of AIOApis
javascript
Copy code
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
3. Define API configurations
javascript
Copy code
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
4. Call API request functions
javascript
Copy code
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
Configuration Properties
id: Unique identifier for the application.
getError: Function to handle errors caught during API requests.
onCatch: Function to handle errors when requests are caught.
loader: Function to render a loading indicator.
baseUrl: Base URL for API requests.
apis: Object containing definitions for individual API endpoints.
API Configuration Properties
method: HTTP method of the request.
description: Description of the request.
getUrl: Function to generate the complete URL of the request.
getBody: Function to generate the request body.
getResult: Function to process the response and return final data.
errorResult: Default value to return in case of errors.
loading: Flag to show loader during the request.
message: Object containing error and success messages configuration.
cache: Object containing properties for caching the request response.
Message Property
The message property within each API configuration allows for customizing error and success messages:

error: Specifies how error messages should be handled. It can be:
A boolean value (true or false) to control the display of auto-generated error messages.
A string value to set a custom error message.
A function that generates a custom error message based on the response.
success: Specifies how success messages should be handled. It follows the same format as error.
Cache Property
The cache property within each API configuration allows for caching the response of the request:

name: A unique identifier for the cache entry.
time: The duration for which the response will be cached, specified in milliseconds.
