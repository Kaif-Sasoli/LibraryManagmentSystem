//************ The Staff Schema **********/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = mongoose.Schema({
        name: {
            type: 'string',
            required: true,
            minLength: [3, 'Name must be at least 3 characters long'],
        },
        password : {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string', 
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        },
        role: {
            type: String,
            enum: ['Admin', 'Librarian', 'Assistant Librarian'],
            required: true
        },
        contact: {
            type: []
        },
        salary: {
            type: Number,
        },
        picture: {
            type: String,
        }
    }, 
        {
            timestamps: true
        }
);

// Encrypt the Password Middleware
staffSchema.pre('save', function(next){
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
staffSchema.method.comparePassword =  async function(){
    return  await bcrypt.compare(password, this.password)
}


 module.exports = mongoose.model('staff', staffSchema);
