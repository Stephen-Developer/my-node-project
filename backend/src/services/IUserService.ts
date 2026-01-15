import { User } from '../types/user';

export interface IUserService {
    hashPassword(password: string, salt?: string): string;
    verifyPassword(password: string, storedHash: string): boolean;
    createNewUser(username: string, password: string): Promise<User>;
    checkUserPassword(username: string, password: string): Promise<boolean>;
    fetchUserData(): Promise<User[]>;
    resetData(): Promise<number | null>;
}