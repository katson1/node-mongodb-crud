# NodeJS CRUD with MongoDB

### CRUD using node and mongodb.

#### Using ES module

###### This is a basic CRUD application built with Node.js and MongoDB. It features user authentication using JWT, with passwords hashed using MD5 encryption. The application provides CRUD operations for user management, serving as a foundational tool for various needs. It's a straightforward starting point for projects requiring user authentication and basic data management.

> ##### How start development:
**Requirements:**

- [node.js v20](https://nodejs.org/en/download/)

- [mongodb v7.0](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.5-signed.msi)

Clone the project.

Install required packages into the project. In the project folder, use the following command in the terminal:

  ```
npm start
  ```

Copy the `.env.example` to `.env`:
  ```
cp .env.example .env
  ```
Run this command in another terminal to start mongodb:
  ```
mongod
  ```

<blockquote> 
<details>
  <summary> Click here if you're having problems with the command "mongod" (on Windows)</summary>
  <blockquote> 
   
    Reinstall MongoDB as usual and wait until Compass appears. If it doesn't, uninstall and reinstall. 
    Copy the installation path; we'll need it.
    Open a command prompt (cmd.exe) as an administrator.
    Type: cd C:\
    Then: md "\data\db"
    After that: "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
    Press "CTRL+C" and close cmd.exe.
    Copy the installation path up to the "bin" folder, for example: C:\Program Files\MongoDB\Server\YOUR_MONGODB_VERSION\bin
    Go to system properties and add to the system environment variables (search on Google) in "PATH":
    Double-click on PATH in "System Environment Variables".
    Click on "New"
    Paste the copied path and click OK.
 </blockquote>
</details>
</blockquote>

Run the project:

  ```
npm start
  ```

## Author:
- [Katson](https://github.com/katson1)
