import crypto from 'crypto';
import { IPasswordService } from './IPasswordService';

export class PasswordService implements IPasswordService {
    hashPassword = (password: string, salt = crypto.randomBytes(16).toString('hex')): string => {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return `${salt}:${hash}`;
    };

    verifyPassword = (password: string, storedHash: string): boolean => {
        const [salt, hash] = storedHash.split(':');
        const hashAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === hashAttempt;
    };
}