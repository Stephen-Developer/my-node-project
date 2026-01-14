//Look into abstracting controller logic using an interface pattern
import { Request, Response } from 'express';
import { User } from '../types/user';
import { IUserController } from './IUserController';
import { IUserService } from '../services/IUserService';

export class UserController implements IUserController {
    constructor(private userService: IUserService) {}

    createUser = async (
        req: Request<{}, {}, User>,
        res: Response
    ): Promise<void> => {
        const { username, password } = req.body;

        const result = await this.userService.createNewUser(username, password);

        res.status(201).json({ message: 'Data processed successfully', result });
    };

    checkUserPassword = async (
        req: Request<{}, {}, User>,
        res: Response
    ): Promise<void> => {
        const { username, password } = req.body;

        const isValid = await this.userService.checkUserPassword(username, password);
        //Check out how to handle invalid password with error handling middleware
        if (isValid) {
            res.status(200).json({ message: 'Password is valid' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    };

    getUserData = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.fetchUserData();
        res.status(200).json({ users });
    };

    resetUserData = async (req: Request, res: Response): Promise<void> => {
        const result = await this.userService.resetData();
        res.status(200).json({ message: 'Data reset successfully', result });
    };
}