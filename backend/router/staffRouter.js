const express = require('express')
const router = express.Router()
const { body } =  require('express-validator')
const staffController = require('../controllers/staffController')


// Register Staff Route
router.post('/register', 
        [
            body('name')
            .isLength({min: 3})
            .withMessage("Name must be at least 3 characters long"),
            body('password')
            .isLength({min: 5})
            .withMessage('Password must be at least 5 characters long'),
            body('email')
            .isEmail()
            .withMessage("Invalid email address"),
            body('role')
            .isIn(['Admin', 'Librarian', 'Assistant Librarian'])
            .withMessage("Role must be one of: Admin, Librarian, Assistant Librarian"),
            body('contact').optional(true),
            body('salary').isInt()
        ],
        staffController.registerStaff   
)

module.exports = router