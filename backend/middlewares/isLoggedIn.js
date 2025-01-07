const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel')

module.exports.isLoggedIn = async (req, res, next) => {
     
    if(!req.cookies.token){
       return res.status(403).json({ message: 'You must be logged in first!!'})
    } else {

        try{
          let decode = JWT.verify(req.cookies.token,  process.env.JWT_SECRET)
          let user = userModel.findOne( {email: decode.email}).select('-password')
          req.user = user;

        } catch(error){
           res.status(403).json({Error: "User not found"})
        }
    }
     

}