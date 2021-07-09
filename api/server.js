const express = require("express");
const server = express();

const projectsRouter = require("./projects/projects-router");
const { errorHandling } = require("./generalMiddleware/index");

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.use(errorHandling);

module.exports = server;
