import express, {Application} from 'express';
import { swaggerUi, specs } from './swagger';
import cors from 'cors';
import {pool} from './db';
import { errorHandler } from './middleware/errorHandler';
import { UserRouterInstance } from './services/index';
import healthRoutes from './routes/healthRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080'
    }));
//Routes
app.use('/users', UserRouterInstance.router);
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