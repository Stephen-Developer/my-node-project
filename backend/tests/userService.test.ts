import { UserService } from "../src/services/userService";
import { IUserModel } from "../src/models/IUserModel";
import { IPasswordService } from "../src/services/IPasswordService";
import { User } from "../src/types/user";
import { createMockUserModel, createMockPasswordService } from "./mockFactory";

describe ("User Service", () => {
    let userService: UserService;
    let mockUserModel: jest.Mocked<IUserModel>;
    let mockPasswordService: jest.Mocked<IPasswordService>;

    beforeEach(async () => {
        mockUserModel = createMockUserModel();
        mockPasswordService = createMockPasswordService();

        userService = new UserService(mockUserModel, mockPasswordService);
    });

    test("creates a new user", async () => {
        const plainPassword = "plaintextpassword";
        const expectedUser : User = {
            username: "testuser",
            password: "hashedpassword"
        }

        mockUserModel.create.mockResolvedValue(expectedUser);

        mockPasswordService.hashPassword.mockReturnValue(expectedUser.password);

        const result = await userService.createNewUser(expectedUser.username, plainPassword);

        expect(mockUserModel.create).toHaveBeenCalledWith(
            expect.objectContaining(expectedUser)
        );

        expect(result).toMatchObject<User>(expectedUser);
    });

    test("tries to create a user with existing username", async () => {
        const plainPassword = "plaintextpassword";
        const expectedUser : User = {
            username: "existinguser",
            password: "hashedpassword"
        }
        const errorMessage = "Username already exists";

        mockUserModel.create.mockRejectedValue(new Error(errorMessage));
        mockPasswordService.hashPassword.mockReturnValue(expectedUser.password);

        await expect(
            userService.createNewUser(expectedUser.username, plainPassword)
        ).rejects.toThrow(errorMessage);

        expect(mockUserModel.create).toHaveBeenCalledWith(
            expect.objectContaining({
                username: expectedUser.username,
                password: expectedUser.password
            })
        );
    });

    test("checks user password correctly", async () => {
        const plainPassword = "plaintextpassword";
        const hashedPassword = "hashedpassword";
        const username = "testuser";

        mockUserModel.getPasswordHash.mockResolvedValue(hashedPassword);
        mockPasswordService.verifyPassword.mockReturnValue(true);

        const result = await userService.checkUserPassword(username, plainPassword);

        expect(mockUserModel.getPasswordHash).toHaveBeenCalledWith(username);
        expect(mockPasswordService.verifyPassword).toHaveBeenCalledWith(plainPassword, hashedPassword);
        expect(result).toBe(true);
    });

    test("checks user with incorrect password", async () => {
        const plainPassword = "wrongpassword";
        const hashedPassword = "hashedpassword";
        const username = "testuser";

        mockUserModel.getPasswordHash.mockResolvedValue(hashedPassword);
        mockPasswordService.verifyPassword.mockReturnValue(false);

        const result = await userService.checkUserPassword(username, plainPassword);

        expect(mockUserModel.getPasswordHash).toHaveBeenCalledWith(username);
        expect(mockPasswordService.verifyPassword).toHaveBeenCalledWith(plainPassword, hashedPassword);
        expect(result).toBe(false);
    });

    test("checks user that does not exist", async () => {
        const plainPassword = "anyPassword";
        const username = "nonexistentuser";

        mockUserModel.getPasswordHash.mockResolvedValue(null);

        const result = await userService.checkUserPassword(username, plainPassword);

        expect(mockUserModel.getPasswordHash).toHaveBeenCalledWith(username);
        expect(mockPasswordService.verifyPassword).not.toHaveBeenCalled();
        expect(result).toBe(false);
    });

    test("fetches user data", async () => {
        const users = [
            { username: "user1", password: "hash1" },
            { username: "user2", password: "hash2" }
        ];

        mockUserModel.findAll.mockResolvedValue(users);

        const result = await userService.fetchUserData();

        expect(mockUserModel.findAll).toHaveBeenCalled();
        expect(result).toEqual(users);
    });

    test("handles empty user data", async () => {
        mockUserModel.findAll.mockResolvedValue([]);

        const result = await userService.fetchUserData();

        expect(mockUserModel.findAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    test("resets all user data", async () => {
        mockUserModel.resetAll.mockResolvedValue(5);

        const result = await userService.resetData();
        
        expect(mockUserModel.resetAll).toHaveBeenCalled();
        expect(result).toBe(5);
    });

    test("resets user data when table is already empty", async () => {
        mockUserModel.resetAll.mockResolvedValue(0);

        const result = await userService.resetData();
        
        expect(mockUserModel.resetAll).toHaveBeenCalled();
        expect(result).toBe(0);
    });
});