const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nome da Sua API',
      version: '1.0.0',
      description: 'Descrição da Sua API',
    },
  },
  apis: ['./routes/*.js'], // Adapte o padrão de arquivos de rota conforme necessário
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = swaggerSpec;