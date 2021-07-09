const Projects = require("./projects-model");

const validateProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({
        status: 404,
        message: "Project not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateProject = (req, res, next) => {
  if (req.body.name && req.body.description) {
    next();
  } else {
    next({
      status: 400,
      message: "Missing required name and/or description fields",
    });
  }
};

const validateUpdatedProject = (req, res, next) => {
  if (
    req.body.name &&
    req.body.description &&
    req.body.completed !== undefined
  ) {
    next();
  } else {
    next({
      status: 400,
      message: "Missing required name, description, and/or completed fields",
    });
  }
};

module.exports = {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
};
