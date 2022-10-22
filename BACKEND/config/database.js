const {
    DB_USERNAME = 'postgres',
    DB_PASSWORD = 'root',
    DB_HOST = "localhost",
    DB_NAME = "mobile",
  } = process.env;
  
  module.exports = {
    development: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: `${DB_NAME}`,
      host: DB_HOST,
      dialect: "postgres",
    },
    test: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: `${DB_NAME}_test`,
      host: DB_HOST,
      dialect: "postgres",
    },
    production: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: `${DB_NAME}_production`,
      host: DB_HOST,
      dialect: "postgres",
    },
  };
  