const crypto = require('crypto');
const userModel = require('../models/userModel');

const hashPassowrd = (password, salt=crypto.randomBytes(16).toString('hex')) => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    console.log("Generated hash:", hash);
    return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
    console.log("Verifying password against stored hash:", storedHash);
    const [salt, hash] = storedHash.split(':');
    const hashAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === hashAttempt;
};

const createNewUser = async (username, password) => {
    console.log("In userService - creating new user:", username);
    const hashedPassword = hashPassowrd(password);
    console.log("Hashed password:", hashedPassword);
    const newUser = await userModel.create({ username, password: hashedPassword });
    return newUser;
};

const checkUserPassword = async (userId, password) => {
    const storedHash = await userModel.getPasswordHash(userId);
    const isMatch = verifyPassword(password, storedHash);
    return isMatch;
};

const fetchUserData = async () => {
    // Simulate fetching data from database
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