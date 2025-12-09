const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { username, password } = req.body;
    
    const result = await userService.createNewUser(username, password);
    if(result.error) {
        return res.status(400).json({ message: result.error });
    }
    res.status(200).json({ message: 'Data processed successfully', result });
};

const checkUserPassword = async (req, res) => {
    const { username, password } = req.body;

    const isValid = await userService.checkUserPassword(username, password);
    if (isValid) {
        res.status(200).json({ message: 'Password is valid' });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
};

const getUserData = async (req, res) => {
    const users = await userService.fetchUserData();
    res.status(200).json({ users });
};

const resetUserData = async (req, res) => {
    const result = await userService.resetData();
    res.status(200).json({ message: 'Data reset successfully', result });
};

module.exports = {
    createUser,
    checkUserPassword,
    getUserData,
    resetUserData
};
