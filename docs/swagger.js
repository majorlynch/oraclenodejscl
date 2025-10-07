// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Customer API',
    version: '1.0.0',
    description: 'API documentation for customer endpoints'
  },
  servers: [{ url: 'http://localhost:8080' }]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] // Update path
};

module.exports = swaggerJsdoc(options);