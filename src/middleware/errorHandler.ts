import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/httpError';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (!(err instanceof Error)) {
        return res.status(500).json({ message: 'An unknown error occurred' });
    }
    const httpError = err as HttpError;
    const status = httpError.status || 500;
    const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
    res.status(status).json({ message });
}