const { swaggerUi, specs } = require('./swagger');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = require('./db');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');

//Middleware
app.use(express.json());
//Routes
app.use('/users', userRoutes);
app.use('/', healthRoutes);
//Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//Error handling middleware
app.use(errorHandler);

//Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const shutdown = async () => {
    console.log('Shutting down server...');
    await pool.end();
    server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);