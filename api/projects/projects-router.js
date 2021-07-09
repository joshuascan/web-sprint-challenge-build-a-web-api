const express = require("express");
const Projects = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  res.status(200).json(req.method);
  console.log(req.method);
});

router.delete("/:id", (req, res) => {
  res.status(200).json(req.method);
  console.log(req.method);
});

router.get("/:id/actions", (req, res) => {
  res.status(200).json(req.method);
  console.log(req.method);
});

module.exports = router;
