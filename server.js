const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = require('./db');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

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