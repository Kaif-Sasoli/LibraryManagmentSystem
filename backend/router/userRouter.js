const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/userController')


// Register User Route
router.post('/register', 
    [
    body('name')
        .isLength({min: 3})
        .withMessage("Name must be at least 3 characters long"),
    body('fname')
        .isLength({min: 3})
        .withMessage("Father Name must be at least 3 characters long"),
    body('password')
        .isLength({min: 6})
        .withMessage("Password must be 6 characters long"),
    body('email')
        .isEmail()
        .withMessage("Invalid email address"),
    body('role')
        .isIn(['student', 'teacher']),
    body('contact').optional(true)

    ], 
        userController.registerUser
  )


router.post('/login', [
        body('email')
        .isEmail()
        .withMessage("Invalid email address"),
        body('password')
        .isLength({ min: 6})
        .withMessage("Password must be 6 characters long")
        ],
     userController.userLogin
    )

  module.exports = router;


  
