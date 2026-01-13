//Refactor to use User as a class model
import { pool } from '../db';
import { User } from '../types/user';

export const findAll = async (): Promise<User[]> => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
};

export const create = async ({ username, password }: User): Promise<User> => {
    const res = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
    );
    return res.rows[0];
};

export const getPasswordHash = async (username: string): Promise<string|null> => {
    const res = await pool.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
    );
    return res.rows[0]?.password;
}

export const resetAll = async (): Promise<number|null> => {
    const res = pool.query('DELETE FROM users');
    return (await res).rowCount;
};