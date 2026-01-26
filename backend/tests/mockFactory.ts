import { IUserService } from "../src/services/IUserService";
import { IPasswordService } from "../src/services/IPasswordService";
import { IUserModel } from "../src/models/IUserModel";

export function createMockUserService(): jest.Mocked<IUserService> {
    return {
        createNewUser: jest.fn(),
        checkUserPassword: jest.fn(),
        fetchUserData: jest.fn(),
        resetData: jest.fn()
    };
}

export function createMockUserModel(): jest.Mocked<IUserModel> {
    return {
        create: jest.fn(),
        getPasswordHash: jest.fn(),
        findAll: jest.fn(),
        resetAll: jest.fn()
    };
}

export function createMockPasswordService(): jest.Mocked<IPasswordService> {
    return {
        hashPassword: jest.fn(),
        verifyPassword: jest.fn()
    };
}

export function clearAllMocks() {
    jest.clearAllMocks();
}