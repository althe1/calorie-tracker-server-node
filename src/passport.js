const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");
const db = require("./db");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db("user").where({ username }).first();

      if (!user) {
        return done(null, false);
      }

      if (!(await argon2.verify(user.password, password))) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db("user")
    .where({ id })
    .first()
    .then((user) => done(null, user))
    .catch(done);
});

module.exports = passport;
