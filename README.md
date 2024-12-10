Team Generator Application

## Get Started

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/)[18.19.1] - JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://npmjs.org/) - Node package manager
- [MySQL](https://www.mysql.com/downloads/) - Relational database management system (RDBMS) 

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/Bikranshu/team-generator.git
 $ cd team-generator
 $ cp .env.example .env (edit it with your secret key and database information)
 $ npm install
 $ npm run migrate
```
 Finally, start and build the application:
 
```
 $ npm run start (production)
 $ npm run start:dev (development)
```

List of NPM Commands:
 
```
  $ npm run eslint       # linting
  $ npm run clean      # remove dist and node_modules folder and install dependencies
```

### 3. Usage

URL : http://localhost:3000/

Navigate to http://localhost:3000/swagger/index.html for the API documentation.

Navigate to http://localhost:3000/swagger/tema-generator-1.0.0.yaml for the swagger YAML documentation.

### 4. Database migration and seed

To create the new migration:

    $ npm run migrate:make <migration name>
    $ npm run migrate:make create_users_table

To create the new seed:

    $ npm run seed:make <seed name>
    $ npm run seed:make insert_users_table
 
### 5. Project Structure

```
src\
 |--migrations\                   # Schema migration (database change management)
 |--routes\                       # Root Routes config 
 |--seeds\                        # Seed database with test or default data
 |--platforms\                    # Configuration files and other global services
 |--|--config\                    # Environment variables and configuration related things
 |--|--constants\                 # Application constant variables
 |--|--middlewares\               # Custom express middlewares
 |--|--templates\                 # Email notification and other HTML markup
 |--|--utils\                     # Utility classes and functions
 |--modules\                      # API modules (example: users, companies etc.)
 |--|--usecases\                  # Business logics (service layer) for a module
 |--|--|--module.service.ts       # Module services are seperated into multiple files as required
 |--|--module.route.ts            # Routes for the module
 |--|--module.validators.ts       # Request validators for the module
 |--|--module.model.ts            # Knex Models (data layer) for the module
 |--|--module.controller.ts       # Route controllers (controller layer) for the module
 |... other modules
 |--index.ts                      # App entry point 
```

    
### 6. Useful Link
- Web framework for Node.js - [Express](http://expressjs.com/)
- ORM  for Node.js - [Objection](https://vincit.github.io/objection.js)
- SQL Query Builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle - [Knex](http://knexjs.org/)
- JSON Web Tokens(jwt) - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- Logging Library - [Winston](https://www.npmjs.com/package/winston)
- Object Schema Validation  - [Joi](https://www.npmjs.com/package/joi)
- Send Email Notification  - [Nodemailer](https://www.npmjs.com/package/nodemailer)
- Template Engine  - [Pug](https://www.npmjs.com/package/pug)
- HTTP headers for security  - [Helmet](https://github.com/helmetjs/helmet)
- Cross-Origin Resource-Sharing  - [cors](https://github.com/expressjs/cors)
- Use to limit repeated requests to public APIs and/or endpoints such as password reset  - [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- API Documentation using [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- Environment Configuration - [dotenv](https://www.npmjs.com/package/dotenv)
- Code Linting Tool - [ESLint](http://eslint.org/)
- Code Formatter - [Prettier](https://www.npmjs.com/package/prettier)
