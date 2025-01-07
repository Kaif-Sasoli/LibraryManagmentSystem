//*******      Database Connection *******        
const mongoose = require('mongoose');

// Function Connects database
const  dbConnection = async () => {
    try {
     const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/LMS')
     console.log(`\n MonogoDB connected !! DB HOST: ${connectionInstance}`)
    } catch (error) {
      console.log("MONGODB connection FAILED: " , error)
      process.exit(1);
    }
}

module.exports = dbConnection