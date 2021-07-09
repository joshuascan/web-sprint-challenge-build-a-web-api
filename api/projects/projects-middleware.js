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

module.exports = {
  validateProjectId,
  validateProject,
};
