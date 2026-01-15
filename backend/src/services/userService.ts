
import { User } from '../types/user';
import { IUserModel } from '../models/IUserModel';
import { IUserService } from './IUserService';
import { IPasswordService } from './IPasswordService';

export class UserService implements IUserService {
    constructor(
        private userModel: IUserModel,
        private passwordService: IPasswordService
    ) {}

    //Service functions
    createNewUser = async (username: string, password: string): Promise<User> => {
        const hashedPassword = this.passwordService.hashPassword(password);
        const newUser = await this.userModel.create({ username, password: hashedPassword });
        return newUser;
    };

    checkUserPassword = async (username: string, password: string): Promise<boolean> => {
        const storedHash = await this.userModel.getPasswordHash(username);
        if (!storedHash) {
            return false; // User not found
        }
        const isMatch = this.passwordService.verifyPassword(password, storedHash);
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

