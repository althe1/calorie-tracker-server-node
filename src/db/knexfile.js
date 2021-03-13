const path = require('path');

// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite')
    },
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    useNullAsDefault: true,
    asyncStackTraces: true
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      directory: path.join(__dirname, "migrations")
    }
  }

};
