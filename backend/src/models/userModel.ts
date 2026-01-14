//Refactor to use User as a class model
import { pool } from '../db';
import { Pool, PoolClient } from 'pg';
import { User } from '../types/user';

export const findAll = async (client?: Pool | PoolClient): Promise<User[]> => {
    const db = client ?? pool;
    const res = await db.query('SELECT * FROM users');
    return res.rows;
};

export const create = async (
    { username, password }: User,
    client?: Pool | PoolClient
): Promise<User> => {
    const db = client ?? pool;
    const res = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
    );
    return res.rows[0];
};

export const getPasswordHash = async (
    username: string,
    client?: Pool | PoolClient
): Promise<string | null> => {
    const db = client ?? pool;
    const res = await db.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
    );
    return res.rows[0]?.password ?? null;
};

export const resetAll = async (client?: Pool | PoolClient): Promise<number> => {
    const db = client ?? pool;
    const res = await db.query('DELETE FROM users');
    return res.rowCount ?? 0;
};