const JWT = require('jsonwebtoken');

// Return Token 
module.exports.generateToken =  (user) => {
    return  JWT.sign(
        { email: user.email, id: user.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' });
};