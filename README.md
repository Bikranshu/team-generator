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

    
### 5. Useful Link
- Web framework for Node.js - [Express](http://expressjs.com/)
- ORM  for Node.js - [Objection](https://vincit.github.io/objection.js)
- SQL Query Builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle - [Knex](http://knexjs.org/)
- Logging Library - [Winston](https://www.npmjs.com/package/winston)
- Object Schema Validation  - [Joi](https://www.npmjs.com/package/joi)
- Template Engine  - [Pug](https://www.npmjs.com/package/pug)
- HTTP headers for security  - [Helmet](https://github.com/helmetjs/helmet)
- Cross-Origin Resource-Sharing  - [cors](https://github.com/expressjs/cors)
- API Documentation using [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui](https://www.npmjs.com/package/swagger-ui)
- Environment Configuration - [dotenv](https://www.npmjs.com/package/dotenv)
