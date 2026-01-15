export interface IUserController {
    createUser(req: any, res: any): Promise<void>;
    checkUserPassword(req: any, res: any): Promise<void>;
    getUserData(req: any, res: any): Promise<void>;
    resetUserData(req: any, res: any): Promise<void>;
}