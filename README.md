

# WebApp


## First Action

JsonServer:

Install JSON Server Globally:

npm install -g json-server


start JSON server (I used users_db.json from my project, can test with any simillar json file):

json-server --watch users_db.json --port 3000


Access Endpoints (I am using those from the client):

1. List all users: http://localhost:3000/users
2. Get a specific user: http://localhost:3000/users/1
3. Add a new user (POST): http://localhost:3000/users
4. Update a user (PUT): http://localhost:3000/users/1
5. Delete a user (DELETE): http://localhost:3000/users/1

   

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

1. Install Node.js and npm
Ensure you have Node.js (at least v16.14.0 or later) and npm installed.
Verify installation:


node -v

npm -v

If not installed, download from Node.js official website.


2. Install Angular CLI
Make sure Angular CLI is installed globally:

npm install -g @angular/cli@19


Verify the installation:


ng version

4. Install Project Dependencies
Navigate to your project folder:

bash


cd your-angular-project

Install all required dependencies:


npm install


To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


