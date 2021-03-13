const express = require("express");
const { nanoid } = require("nanoid");
const argon2 = require("argon2");
const router = express.Router();
const passport = require("../passport");
const db = require("../db");

// GET
router.get("/", (req, res) => {
  if (req.user) {
    res.send({ username: req.username, adminStatus: false });
  } else {
    res.status(403).end();
  }
});

// POST - LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.end();
});

// POST - REGISTER
router.post("/register", async (req, res, next) => {
  db("user")
    .insert({
      id: nanoid(),
      username: req.body.username,
      password: await argon2.hash(req.body.password, { type: argon2.argon2id }),
    })
    .then(() => res.status(201).end())
    .catch(next);
});

// PATCH - USERNAME
router.patch("/username", (req, res, next) => {
    if (req.user) {
        db("user")
        .where({ id: req.user.id })
        .first()
        .update({ username: req.body.username })
        .then(() => res.end())
        .catch(next);
    } else {
        res.status(403).end();
    }
});

// DELETE
router.delete("/logout", (req, res) => {
  req.logout();
  res.end();
});

module.exports = router;
