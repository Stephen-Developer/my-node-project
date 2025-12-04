const { body, validationResult } = require('express-validator');

const validateUserSubmit = [
    body('name').isString().isLength({min: 1}),
    body('age').isInt({ min: 0 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Invalid Input');
            err.status = 400;
            err.details = errors.array();
            throw err;
        }
    }
];

module.exports = {
    validateUserSubmit
};