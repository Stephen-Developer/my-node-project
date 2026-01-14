import { Pool, PoolClient } from 'pg';
import { User } from '../types/user';

export interface IUserModel {
    findAll(client? : Pool | PoolClient): Promise<User[]>;
    create(user: User, client? : Pool | PoolClient): Promise<User>;
    getPasswordHash(username: string, client? : Pool | PoolClient): Promise<string | null>;
    resetAll(client? : Pool | PoolClient): Promise<number>;
}