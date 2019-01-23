const express = require('express');
const configMiddleware = require('../config/middleware');

const projectsRouter = require('../projectsRoutes/projectsRouter');
const actionsRouter = require('../actionsRoutes/actionsRouter');

const server = express();

configMiddleware(server);

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;