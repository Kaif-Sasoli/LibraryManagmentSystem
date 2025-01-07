//**************** User Controller *************/
const userModel = require('../models/userModel');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/generateToken');
const { generateOTP } = require('../utils/generateOTP');
const { sendMail } = require('../controllers/emailController');

module.exports.registerUser = async (req, res, next) => {
     console.log(req.body)
    //  Validation of Body Request
     const error = validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({ Error: "Error:"+ error.array()})
     }
     try {
    
     let {name, email } = req.body;
     // Find isUserAlready Exist
     const isUserAlready = await userModel.findOne({ email: email})
     if(isUserAlready){
        return res.status(400).json({ Error: "User already exists"})
     } else {
        // Create User
        let otp = generateOTP(6)
        const user = await userService.createUser(req.body, otp)
        const token = await generateToken(user)
        sendMail(email, name, otp)
        .then((message) => {
        res
        .status(201)
        .cookie('token',token, { httpOnly: true, secure: true })
        .json({token, user, message: message})
        
      }).catch((error) => {
         res.status(500).json({Error: error.message})
      })
    }
     } catch(error){
          res.status(500).json({Error: error.message})
     }
}


module.exports.userLogin = async (req, res, next) => {

   let error = validationResult(req);
   if(!error.isEmpty()){
      return  res.status(401).json({Error: error.array()});
   } else {

        let {email, password} = req.body;
       
      try{

        let user = await userModel.findOne({ email: email}).select('+password')
        if(!user ||  !(await user.comparePassword(password))){
           res.status(401).json({message: "Invalid Email or Password"});
        } else {

          const token = generateToken(user);
          res.cookie()
          res.status(200).cookie('token', token).json({ message: "User has Logged in successfully", user})
        }
        
      } catch(error){
           res.status(500).json({ message: 'Error Password'+error.message})
      }
   }
}
