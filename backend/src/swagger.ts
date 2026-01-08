import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'Learning project for user management with Express and PostgreSQL',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            example: 'johndoe',
                        },
                        password: {
                            type: 'string',
                            example: 'strongpassword123',
                        },
                    },
                    required: ['username', 'password'],
                },
            },
        }
    },
    apis: ['dist/**/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };