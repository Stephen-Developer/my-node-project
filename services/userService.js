const userModel = require('../models/userModel');

const processUserData = async (name, age) => {
    // Simulate processing (e.g., saving to database)

    if (age < 18) {
        throw new Error('User must be at least 18 years old');
    }

    const newUser = await userModel.create({ name, age });
    return newUser;
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
    processUserData,
    fetchUserData,
    resetData
};