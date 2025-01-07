//******* Index File Starts the server *******/

const app = require('./app.js'); // 
const dotenv = require('dotenv');
const  dbConnection  = require('./config/db.js')

dotenv.config({
    path: './.env'
})


dbConnection()
.then(() => { 
    app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}`)
 });
})
.catch((error) => {
     console.log("MONGO db connection failed !!! ", error)
})
