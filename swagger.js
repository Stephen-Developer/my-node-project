const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'Learning project for user management with Express and PostgreSQL',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};