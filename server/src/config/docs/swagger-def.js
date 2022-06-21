const { version } = require('../../../package.json');
const environment = require('../environment');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Choose to drive API',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${environment.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
