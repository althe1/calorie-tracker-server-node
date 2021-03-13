const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const session = require("express-session");

// Authentication
const passport = require("./passport");

// Database
const db = require("./db");

// Constants
const PORT = process.env.PORT || 4000;
const ONE_DAY = 86400000;

// Server config
const app = express();
const routes = require("./routes");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000" || process.env.ORIGIN,
  })
);
app.use(helmet());
app.use(logger("tiny"));
app.use(express.json());
app.use(
  session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: ONE_DAY,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/users", routes.users);
app.use(
  "/calories",
  (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(403).end();
    }
  },
  routes.calories
);

// Start server
app.listen(PORT, async () => {
  try {
    await db.migrate.latest();
    console.log(`Listening on port ${PORT}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
