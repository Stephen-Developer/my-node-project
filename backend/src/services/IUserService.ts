import { User } from '../types/user';

export interface IUserService {
    createNewUser(username: string, password: string): Promise<User>;
    checkUserPassword(username: string, password: string): Promise<boolean>;
    fetchUserData(): Promise<User[]>;
    resetData(): Promise<number | null>;
}