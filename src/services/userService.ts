import crypto from 'crypto';
import * as userModel from '../models/userModel';
import { User } from '../types/user';

//Helper functions
const hashPassword = (password: string, salt=crypto.randomBytes(16).toString('hex')): string => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return `${salt}:${hash}`;
};

const verifyPassword = (password: string, storedHash: string): boolean => {
    const [salt, hash] = storedHash.split(':');
    const hashAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === hashAttempt;
};

//Service functions
export const createNewUser = async (username: string, password: string): Promise<User> => {
    const hashedPassword = hashPassword(password);
    const newUser = await userModel.create({ username, password: hashedPassword });
    return newUser;
};

export const checkUserPassword = async (username: string, password: string): Promise<boolean> => {
    const storedHash = await userModel.getPasswordHash(username);
    if (!storedHash) {
        return false; // User not found
    }
    const isMatch = verifyPassword(password, storedHash);
    return isMatch;
};

export const fetchUserData = async (): Promise<User[]> => {
    const users = await userModel.findAll();
    return users;
};

export const resetData = async (): Promise<number|null> => {
    const result = await userModel.resetAll();
    return result;
};