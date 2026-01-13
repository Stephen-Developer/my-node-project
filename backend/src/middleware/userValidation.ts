//Maybe rename this to a service, and put it in shared folder so can be used from front end too
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUserDetails = [
    body('username')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];