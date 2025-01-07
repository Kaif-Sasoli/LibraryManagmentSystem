const staffModel = require('../models/staffModel')
const staffService = require('../services/staffService')
const { validationResult } = require('express-validator')
const { generateToken } = require('../utils/generateToken')


// Register Staff
module.exports.registerStaff = async (req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty()){
       return res.status(400).json({ Error: "Error:" + error.array()})
    } else {

        try {
            let { email } = req.body;
            let isStaffAlready = await staffModel.findOne({ email: email })

        if(isStaffAlready){
             return res.status(400).json({ Error: "Staff already exists" })
        } else {
            const staff = await staffService.createStaff(req.body)
            let token = await generateToken(staff);
            res
            .status(201)
            .cookie('token', token, {httpOnly: true, secure: true})
            .json({token, staff})
        }
        } catch (error){
            res.json({error: error.message})
        }
    }
}
