module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation using Swagger JSDoc',
    },
    apis: ['./routes/*.js'], // Путь к вашим файлам роутера
};
