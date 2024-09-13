const { check, body ,  validationResult } = require('express-validator');

exports.validateUserProfile = [ 
    body('profileData.firstName').notEmpty().withMessage('First name is required'),
    body('profileData.lastName').notEmpty().withMessage('Last name is required'),
    body('profileData.email').isEmail().withMessage('Email must be valid'),
    body('profileData.address').notEmpty().withMessage('Address is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    },
  ];