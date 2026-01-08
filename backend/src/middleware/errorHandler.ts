import { Request, Response, NextFunction } from 'express';
import { isHttpError } from '../types/httpError';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if(isHttpError(err)) {
        const status = err.status || 500;
        const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
        res.status(status).json({ message });
        return;
    }

    if(err instanceof Error) {
        const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
        res.status(500).json({ message });
        return;
    }

    res.status(500).json({ message: 'Internal Server Error' });
}