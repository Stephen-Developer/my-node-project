//Refactor to use User as a class model
import { Pool, PoolClient } from 'pg';
import { User } from '../types/user';
import { IUserModel } from './IUserModel';

export class UserModel implements IUserModel {
    constructor(private db: Pool) {}

    async findAll (client?: Pool | PoolClient): Promise<User[]> {
        const db = client ?? this.db;
        const res = await db.query('SELECT * FROM users');
        return res.rows;
    };

    async create (
        { username, password }: User,
        client?: Pool | PoolClient
    ): Promise<User> {
        const db = client ?? this.db;
        const res = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        return res.rows[0];
    };

    async getPasswordHash (
        username: string,
        client?: Pool | PoolClient
    ): Promise<string | null> {
        const db = client ?? this.db;
        const res = await db.query(
            'SELECT password FROM users WHERE username = $1',
            [username]
        );
        return res.rows[0]?.password ?? null;
    };

    async resetAll (client?: Pool | PoolClient): Promise<number> {
        const db = client ?? this.db;
        const res = await db.query('DELETE FROM users');
        return res.rowCount ?? 0;
    };
}

