const userService = require('../services/userService');

const submitUserData = async (req, res) => {
    const { name, age } = req.body;
    
    const result = await userService.processUserData(name, age);
    res.status(200).json({ message: 'Data processed successfully', result });
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
    submitUserData,
    getUserData,
    resetUserData
};
