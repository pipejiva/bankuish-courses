# Bankuish Courses API


## Features
- **Modular Architecture**: Uses a modular architecture, allowing easy separation of concerns and code reuse.
- **Database Integration**: Easily integrates with MySQL.
- **Authentication and Authorization**: Provides mechanisms for user authentication and authorization in this case with Firebase.
- **Testing and Documentation**: Supports testing with tools like Jest and generates API documentation using OpenAPI specifications.

## Prerequisites

I used `nvm` to install node v16.16.0

- Docker
- Node.js (version v16.16.0 LTS)
- npm (version 8.11.0)
- SQL database running

## Configuration

1. Rename the `.env.example` file to `.env` and update the configuration values based on your needs.

## Configure SQL database

1. Run `docker-compose up -d`
2. Run `docker ps` and check the MySQL <container_ID>
3. Get the container IP `docker inspect   -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_ID>`
4. Add connection values to `.env` file

```
   -DB_HOST (Container IP)
   -DB_PORT
   -DB_USER
   -DB_PASSWORD
   -DB_DATABASE
```
## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
yarn install
```

## Run the application
```sh
yarn run build
```

```sh
yarn start
```
Open http://localhost:3000/explorer in your browser.


## Authentication
1. Open http://localhost:3000/explorer/#/TokenController/TokenController.generateToken in your browser.
2. Write on the request body  `{"email": "pipe2211@hotmail.com"}`and click in execute
3. Click on "Authorize" at the top of the page
4. Paste the JWT in the field value
   Note: Just UserController and CourseController have authentication requirement

## Database
[Database Diagram](https://drive.google.com/file/d/1rw-BPAoLzCj1TACkdry2Rqh0-U0zKaSl/view?usp=share_link)


### Populate database

1. The application must be running and connected to the database
2. Open the "GET" method `http://localhost:3000/explorer/#/PopulateController/PopulateController.find`


## Build or rebuild the project

To incrementally build the project:

```sh
yarn run build
```

To force a full build by cleaning up cached artifacts:

```sh
yarn run rebuild
```

## Tests

```sh
yarn test
```

## Courses prerequisites per user
The method `http://localhost:3000/explorer/#/UserController/UserController.findUserCoursesById` gets the courses per user based on the prerequisites.

## Documentation

API documentation is automatically generated using OpenAPI specifications. Start the application and access the documentation at `http://localhost:3000/explorer`.

## Support

If you have any questions, issues, or feature requests, please contact me at [pipe2211@hotmail.com](mailto:pipe2211@hotmail.com).
