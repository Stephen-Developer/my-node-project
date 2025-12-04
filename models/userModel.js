const pool = require('../db');

const findAll = async () => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
};

const create = async ({ name, age }) => {
    const res = await pool.query(
        'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
        [name, age]
    );
    return res.rows[0];
};

const resetAll = async () => {
    const res = pool.query('DELETE FROM users');
    return (await res).rowCount;
};

module.exports = {
    create,
    findAll,
    resetAll
};