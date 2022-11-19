# Cache Manager

# README #
This README document will provide steps to get this application up and running.

### Basic steps ###
- `Create .env file`
  - `To run the project in copy `.env.development`  to  `.env
- `Run 'nvm' ` (within the directory) ( or use NodeJs v16.x )
- `Run 'npm install' or 'npm i'` (within the directory)
- `To start the project :`
  - `In type the command in terminal 'npm start'`
- `In the development environment, the server will start on port 5000`

### Configurations ###

- Database configurations in `./src/configs/database/database.js`

### Files ###

- `.env` > for environment variables

### Docker ###

- Containers :
  - Nodejs server :
    - container name  = `cache-manager-server`
    - port            = `5000`
  - MongoDB :
    - container name  = `mongodb-service`
    - port            = `27017`

### Third-party libraries and usage ###

#### Dependencies ####

* `body-parser`         - Node.js body parsing middleware
* `dotenv`              - Loads environment variables from a . env file into process. env
* `mongoose`            - Mongodb schema solution
* `uuid`                - Generate random ids

#### Dev-Dependencies ####

* `babel-eslint`  - Linting utility
* `eslint`        - Linting utility
* `prettier`        - Linting utility
* `nodemon`       - Automatically restarting the node application when file changes

#### TODO ####
* `Unit tests`
* `Swagger documentations`

#### Areas can improve ####
* `Response data handeling`
* `Error handeling`
* `Error logging`
* `Typescript integration`