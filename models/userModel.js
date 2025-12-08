const { get } = require('http');
const pool = require('../db');

const findAll = async () => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
};

const create = async ({ username, password }) => {
    console.log("In userModel - creating user:", username, password);
    const res = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
    );
    return res.rows[0];
};

const getPasswordHash = async (username) => {
    console.log("In userModel - fetching password hash for user:", username);
    const res = await pool.query(
        'SELECT password FROM users WHERE username = $1',
        [username]
    );
    return res.rows[0]?.password;
}

const resetAll = async () => {
    const res = pool.query('DELETE FROM users');
    return (await res).rowCount;
};

module.exports = {
    create,
    getPasswordHash,
    findAll,
    resetAll
};