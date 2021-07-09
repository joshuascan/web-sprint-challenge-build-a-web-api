const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", (req, res) => {});

module.exports = router;
