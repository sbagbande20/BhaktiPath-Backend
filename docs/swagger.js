const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger config
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'BhaktiPath Private APIs',
      version: '1.0.0',
      description: 'API documentation for BhaktiPath Backend'
    },
    servers: [
      {
        url: 'http://localhost:5000', // update if deployed
      },
    ],
  },
  apis: ['./routes/*.js'], // 👈 where your routes live
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
