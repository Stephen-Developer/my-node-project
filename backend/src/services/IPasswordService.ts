export interface IPasswordService {
    hashPassword(password: string, salt?: string): string;
    verifyPassword(password: string, storedHash: string): boolean;
}