const express = require("express");
const Actions = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateActionId, validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

module.exports = router;
