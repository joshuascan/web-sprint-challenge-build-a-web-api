const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

const validateActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({
        status: 404,
        message: "Action not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateAction = async (req, res, next) => {
  try {
    if (req.body.project_id && req.body.description && req.body.notes) {
      const project = await Projects.get(req.body.project_id);
      if (project) {
        const description = req.body.description;
        if (description.length <= 128) {
          next();
        } else {
          next({
            status: 400,
            message: "Description cannot be more than 128 characters",
          });
        }
      } else {
        next({
          status: 404,
          message: "Project not found",
        });
      }
    } else {
      next({
        status: 400,
        message: "Missing required notes, description, and/or project id",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateActionId, validateAction };
