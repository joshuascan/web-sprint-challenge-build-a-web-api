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

module.exports = {
  validateProjectId,
};
