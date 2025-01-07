//********* User Schema **********/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { bookCopy } = require('./bookModel');

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLength: [3, 'Name must be at least 3 characters long'],
        },
        fname : {
            type: String,
            required: true,
            minLength: [3, 'Name must be at least 3 characters long'],
        },
        password : {
            type: String,
            required: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        },
        role :{
            type: String,
            enum: ['student', 'teacher'],
            default: 'user'
        },
        contact: {
            type: []
        },
        borrowed: {
           type: [mongoose.Schema.Types.ObjectId],
           default: [],
           ref: 'bookCopy',
           validate : {  // Validator... user can barrow at least 3 books
             validator: function(value){  
                 return value.length <= 3
             }
           },
        },      
        degreeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref : 'degreeProgram',
        },
        picture: {
            type: String,
        },
        otp: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 6,
        },
        otpExpiry: {
            type: Date,
            default: function(){
                return new Date(Date.now() + 60 * 60 * 1000)
            }
        },
        isVarified: {
            type: Boolean,
            default: false
        }
    }, 
        {
            timestamps: true
        }
);


// Encrypt the Password Middleware
userSchema.pre('save', function(next){
   //    
   if(!this.isModified('password')) return next();
    // Encrypt the password
    bcrypt.genSalt(10)
       .then(salt => bcrypt.hash(this.password, salt))
       .then(hash => {
           this.password = hash;
           next();
       })
       .catch(err => next(err));
   
});

// Compare password
userSchema.methods.comparePassword =  async function(password){
    return  await bcrypt.compare(password, this.password)
}


 module.exports = mongoose.model('User', userSchema);
