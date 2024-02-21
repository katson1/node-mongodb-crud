# NodeJS CRUD with MongoDB

###### This is a basic CRUD application built with Node.js and MongoDB. It features user authentication using JWT, with passwords hashed using MD5 encryption. The application provides CRUD operations for user management, serving as a foundational tool for various needs. It's a straightforward starting point for projects requiring user authentication and basic data management.

## 📋 Requires:
[`Node.js: v20.9.0`](https://nodejs.org/en/download/)

[`MongoDB: v7.0.5`](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.5-signed.msi)

## 🔧 Installation:
Clone the Repository.

Install Dependencies:
```bash
npm install
```

Copy .env.example to .env:
```bash
cp .env.example .env
```

Start the Server:
```bash
npm start
```
> you also can use: `node ./index.js` to start the server.

## 🚀 How to use the API (routes):
<details><summary> Login </summary>

- **URL:** `/login`
- **Method:** POST
- **Description:** Log in to an already registered user, return the authenticate token.
- **Headers Required:** None
- **Request Parameters:**
  - `username` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Example Request Body:**
  ```json
  {
      "username": "user@example.com",
      "password": "password123"
  }
  ```
- **Sucess Response:**
  - Code: 200
  - Example Response Body:
    ```json
    {
        "token": "Token123qwerty"
    }
    ```
      
</details>
<details><summary> Register </summary>

- **URL:** `/register`
- **Method:** POST
- **Description:** Register a new user, return the authenticate token.
- **Headers Required:** None
- **Request Parameters:**
  - `username` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Example Request Body:**
  ```json
  {
      "username": "user@example.com",
      "password": "password123"
  }
  ```
- **Sucess Response:**
  - Code: 200
  - Example Response Body:
    ```json
    {
        "token": "Token123qwerty"
    }
    ```
      
</details>
<details>
  <summary>Logout</summary>
  
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/logout`
  - **Method:** GET
  - **Description:** Logs out the user.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Success Response:**
    - **Code:** 200
    - **Example Response Body:**
      ```json
      {
          "message": "You have been logged out successfully"
      }
      ```
</details>

<details>
  <summary>Users</summary>

  <details>
    <summary>Get All Users</summary>
    
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/users`
  - **Method:** GET
  - **Description:** Retrieves all users.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Success Response:**
    - **Code:** 200
    - **Example Response Body:**
      ```json
      [{
          "_id": 1,
          "username": "John Doe",
          "fullName": "john@example.com",
          "contact": "John Doe",
          "personalKey": "uniquekey123"

      },
      {
          "_id": 2,
          "username": "Arimateia",
          "fullName": "example@example.com",
          "contact": "John Doe",
          "personalKey": "uniquekey123"

      }]
      ```
  </details>

  <details>
    <summary>Get User by ID</summary>
  
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/users/:id`
  - **Method:** GET
  - **Description:** Retrieves a user by their ID.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Parameters:**
    - `id` (integer, required): User ID
  - **Success Response:**
    - **Code:** 200
    - **Example Response Body:**
      ```json
      {
          "_id": 1,
          "username": "John Doe",
          "fullName": "john@example.com",
          "contact": "John Doe",
        "personalKey": "uniquekey123"

      }
      ```
  </details>

  <details>
    <summary>Create User</summary>
    
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/users`
  - **Method:** POST
  - **Description:** Creates a new user.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Request Body:**
    ```json
    {
        "username": "john@example.com",
        "password": "password123"
    }
    ```
  - **Success Response:**
    - **Code:** 201
    - **Example Response Body:**
      ```json
      {
          "_id": 1,
          "username": "john@example.com'  ",
          "fullName": "",
          "contact": "",
          "personalKey": "-"
      }
      ```
  </details>

  <details>
    <summary>Update User by ID</summary>
    
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/users/:id`
  - **Method:** PUT
  - **Description:** Updates a user's information by their ID.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Parameters:**
    - `id` (integer, required): User ID
  - **Request Body:**
    ```json
    {
        "fullName": "John Smith",
        "contact": "+5511123456789"
    }
    ```
  - **Success Response:**
    - **Code:** 200
    - **Example Response Body:**
      ```json
      {
          "_id": 1,
          "username": "john@example.com'  ",
          "fullName": "John Smith",
          "contact": "+5511123456789",
          "personalKey": "-"
      }
      ```
  </details>

  <details>
    <summary>Delete User by ID</summary>
    
  ##### Notice: Authentication Required
  
  To access this API endpoint, include an `Authorization` header with a valid access token. (The `token` is provided during login or register).

  - **URL:** `/users/:id`
  - **Method:** DELETE
  - **Description:** Deletes a user by their ID.
  - **Headers Required:** 
    - `Authorization`: Bearer token
  - **Parameters:**
    - `id` (integer, required): User ID
  - **Success Response:**
    - **Code:** 204 No Content
  </details>

</details>
