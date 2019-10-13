# nc-news project

nc-news project to be used in the Northcoders Front End block.
My app is hosted by Heroku. https://ruths-nc-news.herokuapp.com/api/

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Setup Instructions

Fork this repository to your own GitHub account. Clone your fork of this repository to your local machine and cd into it:

$ git clone <your fork's URL>
$ cd be_nc_news

Make sure you've navigated into the folder and install all dependencies using npm install. You also have access to an npm script to run tests (npm test). To setup the database type 'npm run setup-dbs' and to seed the database type 'npm run seed'.

You will also need node.js and postgres to run this project.

The endpoints.json file shows all the available endpoints in this database.

# Creating a knexfile.js

The knexfile.js contains database configuration - including the configuration for our migration directory. In the knexfile.js we need to specify which client adapter we need to use (as knex itself is client agnostic).
The connection object tells knex which database we are connecting to.

We also need to point knex in the direction of our seed and migration files, so we could end up with something like this:

```js
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: { connection: { database: "db_name" } },
  test: { connection: { database: "db_name_test" } }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

Note how critically we check the current NODE_ENV in order to export either the development or the test object. This ensures that is say process.env.NODE_ENV is “test” then we will be pointing to our test database.

Any migration files we create will be written into ./db/migrations directory inside our project.

# Endpoints

To see all the available endpoints go to /api for a json file showing all endpoints and queries.
