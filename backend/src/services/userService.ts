import crypto from 'crypto';
import { User } from '../types/user';
import { IUserModel } from '../models/IUserModel';
import { IUserService } from './IUserService';

export class UserService implements IUserService {
    constructor(private userModel: IUserModel) {}

    //Helper functions
    hashPassword = (password: string, salt = crypto.randomBytes(16).toString('hex')): string => {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return `${salt}:${hash}`;
    };

    verifyPassword = (password: string, storedHash: string): boolean => {
        const [salt, hash] = storedHash.split(':');
        const hashAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === hashAttempt;
    };

    //Service functions
    createNewUser = async (username: string, password: string): Promise<User> => {
        const hashedPassword = this.hashPassword(password);
        const newUser = await this.userModel.create({ username, password: hashedPassword });
        return newUser;
    };

    checkUserPassword = async (username: string, password: string): Promise<boolean> => {
        const storedHash = await this.userModel.getPasswordHash(username);
        if (!storedHash) {
            return false; // User not found
        }
        const isMatch = this.verifyPassword(password, storedHash);
        return isMatch;
    };

    fetchUserData = async (): Promise<User[]> => {
        const users = await this.userModel.findAll();
        return users;
    };

    resetData = async (): Promise<number | null> => {
        const result = await this.userModel.resetAll();
        return result;
    };
}

