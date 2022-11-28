# Cache Manager

# README #
This README document will provide steps to get this application up and running.
Code challenge details are in the `Code_challenge.pdf` file.

### Basic steps ###
- `Create .env file`
  - `To run the project in copy `.env.development` to `.env
- `Run 'nvm' ` (within the directory) ( or use NodeJs v16.x )
- `Run 'npm install' or 'npm i'` (within the directory)
- `To start the project :`
  - `Type the command in the terminal 'npm start'`
- `In the development environment, the server will start on port 5000`

### Configurations ###

- Database configurations in `./src/configs/database/mongodb.js`

### Files ###

- `.env` > for environment variables

### Docker ###

- Containers :
  - Nodejs server :
    - container name  = `cache-manager-server`
    - port            = `5000`
  - MongoDB :
    - container name  = `MongoDB-service`
    - port            = `27017`

### Third-party libraries and usage ###

#### Dependencies ####

* `body-parser`         - Node.js body-parsing middleware
* `dotenv`              - Loads environment variables from a .env file into the process.env
* `mongoose`            - Mongodb schema solution
* `joi`                 - Request data validation

#### Dev-Dependencies ####

* `babel-eslint`  - Linting utility
* `eslint`        - Linting utility
* `prettier`        - Linting utility
* `nodemon`       - Automatically restarting the node application when files changes

#### Folder structure ####

* `src`           - Source codes root directory
  * `configs`     - Configuration files ( Database/Caching )
    * `caching > cache_data` - Auto generate when caching starts
  * `controllers` - Controller files
  * `helpers`     - Helper functions
  * `middleware`  - Middleware functions
  * `modules`     - Database schemas & modules
  * `routes`      - API routes layer
  * `services`    - Services files
  * `validations` - Request data validation
  * `server.js`   - Entry file
* `.dockerignore`
* `.env.*`
* `.eslintrc.json`
* `gitignore`
* `.nvmrc`        - Nodejs version
* `.prettierrc`
* `docker-compose.yml`
* `Dockerfile`
* `package-lock.json`
* `package.json`
* `README.md`


#### TODO ####
* `Unit tests`
* `Swagger documentation`

#### Areas can improve ####
* `Response data handeling`
* `Error handling`
* `Error logging`
* `Typescript integration`