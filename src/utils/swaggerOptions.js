import path from 'path';

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ImageGram API',
            version: '1.0.0',
            description: 'API documentation for ImageGram application',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
        ],
    },

    apis: [
        path.join(process.cwd(), 'src/routers/**/*.js')
    ],
};
