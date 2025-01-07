//************ User Services *****************/
const userModel = require('../models/userModel')

module.exports.createUser = async ({ name, fname, password, email, role, contact, degreeId},  otp) => {

   if(!name || !fname || !password || !email || !role || !degreeId){
     throw new Error("All fields are required")
   }
   try {
    const user = await userModel.create({
        name,
        fname,
        password,
        email,
        role,
        contact: [contact],
        degreeId,
        otp
    })
    return user

  } catch(error){
     throw new Error("Couldn't create user: " + error.message)
  }
}