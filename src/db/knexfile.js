const path = require("path");

// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "db.sqlite"),
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    useNullAsDefault: true,
    asyncStackTraces: true,
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  },
};
