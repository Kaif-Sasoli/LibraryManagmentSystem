const userModel = require('../models/userModel')
const staffModel = require('../models/staffModel');
const JWT = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    
    const token = req.cookies.token || req.headers['authorization']?.replace("Bearer", "")
    if(!token){
        res.status(401).json({ Error: "You need to login first!"})
    }
    try{
        let decoded = JWT.verify(token, process.env.JWT_SECREAT);
        

        let user = await userModel.findById(decoded?._id).select('-password')
        if(!user) return res.status(401).json({ Error: "User not found"})
            req.user = user;
            next()
    }  
    catch(error){
        res.status(401).json("Unauthrized")
    }
}


// Staff Authorization
module.exports.staffAuth = async function(req, res, next){
     
    const token = req.cookies.token || req.headers['authorization']?.replace('Bearer', '')

    if(!token) return res.status(401).json("You need to Login first!");

    try{

      const decoded = JWT.verify(token, process.env.JWT_SECREAT);

      let staff = await staffModel.findById(decode?._id).select('password')

      if(!staff) return res.status(401).json({Error: 'Staff not found'});
      req.staff = staff;
      next();
    }catch(err){
        res.status(401).json("Unauthrized")
    }
}