//Look into abstracting controller logic using an interface pattern
import { Request, Response } from 'express';
import * as userService from '../services/userService';

interface UserBody {
    username: string;
    password: string;
}

export const createUser = async (
    req: Request<{}, {}, UserBody>, 
    res: Response
) : Promise<void> => {
    const { username, password } = req.body;
    
    const result = await userService.createNewUser(username, password);
    // if(result.error) {
    //     return res.status(400).json({ message: result.error });
    // }
    res.status(200).json({ message: 'Data processed successfully', result });
};

export const checkUserPassword = async (
    req: Request<{}, {}, UserBody>,
    res: Response
) : Promise<void> => {
    const { username, password } = req.body;

    const isValid = await userService.checkUserPassword(username, password);
    //Check out how to handle invalid password with error handling middleware
    if (isValid) {
        res.status(200).json({ message: 'Password is valid' });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
};

export const getUserData = async (req: Request, res: Response) : Promise<void> => {
    const users = await userService.fetchUserData();
    res.status(200).json({ users });
};

export const resetUserData = async (req: Request, res: Response) : Promise<void> => {
    const result = await userService.resetData();
    res.status(200).json({ message: 'Data reset successfully', result });
};