const staffModel = require('../models/staffModel')


module.exports.createStaff = async ({name, password, email, role, contact, salary}) => {

    if(!name || !password || !role || !email || !salary){
        throw new Error('All fields are required')
    } else {
        try {
          const staff = await staffModel.create({
             name,
             password,
             email,
             role,
             contact: [contact],
             salary
          })
          return staff

        } catch(error){
          throw new Error('Could not create Staff' + error.message)
        }
    }
}

