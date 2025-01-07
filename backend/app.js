const cors = require('cors');
const cookieParser = require('cookie-parser');
const express  = require('express');
const app = express();
const path = require('path');
const userRouter = require('./router/userRouter');
const staffRouter = require('./router/staffRouter');


// Middlewares 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/user', userRouter)
app.use('/admin', staffRouter)


// Export App
module.exports = app;
