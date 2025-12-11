const crypto = require('crypto');
const userModel = require('../models/userModel');

//Helper functions
const hashPassword = (password, salt=crypto.randomBytes(16).toString('hex')) => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
    const [salt, hash] = storedHash.split(':');
    const hashAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === hashAttempt;
};

//Service functions
const createNewUser = async (username, password) => {
    const hashedPassword = hashPassword(password);
    const newUser = await userModel.create({ username, password: hashedPassword });
    return newUser;
};

const checkUserPassword = async (userId, password) => {
    const storedHash = await userModel.getPasswordHash(userId);
    const isMatch = verifyPassword(password, storedHash);
    return isMatch;
};

const fetchUserData = async () => {
    const users = await userModel.findAll();
    return users;
};

const resetData = async () => {
    const result = await userModel.resetAll();
    return result;
}

module.exports = {
    createNewUser,
    checkUserPassword,
    fetchUserData,
    resetData
};