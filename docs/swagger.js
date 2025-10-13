// docs/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Customer API',
    version: '1.0.0',
    description: 'API documentation for customer endpoints'
  },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
  servers: [{ url: 'http://localhost:8080' }]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] // Update path
};

export default swaggerJsdoc(options);
