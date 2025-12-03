const userService = require('../services/userService');

const submitUserData = async (req, res) => {
    try {
        const { name, age } = req.body;

        const result = await userService.processUserData(name, age);

        res.status(200).json({ message: 'Data processed successfully', result });
    } catch (error) {
        const status = (error && error.status) || 500;
        const message = (error && error.message) || String(error);

        console.log('Error Status:', status);
        console.log('Error in submitUserData:', message);

        res.status(status).json({ message });
    }
};

const getUserData = async (req, res) => {
    try {
        const users = await userService.fetchUserData();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

const resetUserData = async (req, res) => {
    try {
        const result = await userService.resetData();
        res.status(200).json({ message: 'Data reset successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting data', error });
    }
};

module.exports = {
    submitUserData,
    getUserData,
    resetUserData
};
