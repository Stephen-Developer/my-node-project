import { UserController } from '../src/controllers/userController';
import { IUserService } from '../src/services/IUserService';
import { User } from '../src/types/user';
import { Request, Response } from 'express';
import { clearAllMocks, createMockUserService } from './mockFactory';

describe("User Controller", () => {
    let userController: UserController;
    let mockUserService: jest.Mocked<IUserService>;

    beforeEach(() => {
        mockUserService = createMockUserService();

        userController = new UserController(mockUserService);
    });

    afterEach(() => {
        clearAllMocks();
    });

    test("creates a new user and sends response", async () => {

        const req: Partial<Request<{}, {}, User>> = {
            body: {
                username: "testuser",
                password: "plaintextpassword"
            }
        };

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockUserService.createNewUser.mockResolvedValue({
            username: "testuser",
            password: "hashedpassword"
        });

        const result = await userController.createUser(req as Request<{}, {}, User>, res as Response);

        expect(mockUserService.createNewUser).toHaveBeenCalledWith("testuser", "plaintextpassword");
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Data processed successfully',
            result: {
                username: "testuser",
                password: "hashedpassword"
            }
        });
    });

    test("checks user password and sends valid response", async () => {
        const req: Partial<Request<{}, {}, User>> = {
            body: {
                username: "testuser",
                password: "plaintextpassword"
            }
        };

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockUserService.checkUserPassword.mockResolvedValue(true);

        await userController.checkUserPassword(req as Request<{}, {}, User>, res as Response);

        expect(mockUserService.checkUserPassword).toHaveBeenCalledWith("testuser", "plaintextpassword");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password is valid' });
    });

    test("checks user password and sends invalid response", async () => {
        const req: Partial<Request<{}, {}, User>> = {
            body: {
                username: "testuser",
                password: "wrongpassword"
            }
        };

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockUserService.checkUserPassword.mockResolvedValue(false);

        await userController.checkUserPassword(req as Request<{}, {}, User>, res as Response);

        expect(mockUserService.checkUserPassword).toHaveBeenCalledWith("testuser", "wrongpassword");
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' });
    });

    test("fetches user data and sends response", async () => {
        const req: Partial<Request> = {};

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockUserService.fetchUserData.mockResolvedValue([
            { username: "user1", password: "hash1" },
            { username: "user2", password: "hash2" }
        ]);

        await userController.getUserData(req as Request, res as Response);

        expect(mockUserService.fetchUserData).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            users: [
                { username: "user1", password: "hash1" },
                { username: "user2", password: "hash2" }
            ]
        });
    });

    test("resets user data and sends response", async () => {
        const req: Partial<Request> = {};

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockUserService.resetData.mockResolvedValue(5);

        await userController.resetUserData(req as Request, res as Response);
        expect(mockUserService.resetData).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Data reset successfully',
            result: 5
        });
    });
});