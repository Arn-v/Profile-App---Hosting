const { check, validationResult } = require('express-validator');

exports.validateUserProfile = [
    check('profileData.firstName')
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 50 }).withMessage('First name can be at most 50 characters long'),
    check('profileData.lastName')
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 60 }).withMessage('Last name can be at most 60 characters long'),
    check('profileData.email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
    check('profileData.address')
        .notEmpty().withMessage('Address is required')
        .isLength({ max: 200 }).withMessage('Address can be at most 200 characters long')
        
        ,
     
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];