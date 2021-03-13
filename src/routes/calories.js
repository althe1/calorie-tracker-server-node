const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", async (req, res, next) => {
  try {
    const myCalories = await db("calorie").where({ user_id: req.user.id }).select('id', 'value', 'created_at');
    res.json(myCalories);
  } catch (error) {
    next(error);
  }
});

// POST - CREATE CALORIE ENTRY
router.post("/", async (req, res, next) => {
  try {
    const id = nanoid();
    await db("calorie").insert({
      id,
      user_id: req.user.id,
      value: req.body.value,
    });
    const myEntry = await db("calorie").where({ id }).first('id', 'value', 'created_at');
    res.json(myEntry);
  } catch (e) {
    next(e);
  }
});

// PATCH - UDPATE CALORIE ENTRY
router.patch("/:id", async (req, res, next) => {
    db("calorie")
      .where({ id: req.params.id })
      .update({ value: req.body.value })
      .then(() => res.end())
      .catch(next);
});

// DELETE - REMOVE CALORIE ENTRY
router.delete("/:id", async (req, res, next) => {
  db("calorie")
      .where({ id: req.params.id })
      .del()
      .then(() => res.end())
      .catch(next);
});

module.exports = router;
