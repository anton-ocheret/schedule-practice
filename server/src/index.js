const mongoose = require('mongoose');
const environment = require('./config/environment');
const logger = require('./services/logger');
const app = require('./app');

let server;

mongoose.connect(environment.mongoose.url, environment.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  server = app.listen(environment.port, () => {
    logger.info(`Listening to port ${environment.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncoughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
