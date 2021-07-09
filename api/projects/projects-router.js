const express = require("express");
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
} = require("./projects-middleware");

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

router.put(
  "/:id",
  validateProjectId,
  validateUpdatedProject,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch(next);
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    await Projects.remove(id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;
