//**********  Deptartment & DegreeProgram Schema ***********/
const mongoose = require('mongoose');

const deptSchema = mongoose.Schema({
    deptName: {
        type: 'string',
        required: true,
        minLength: [3, 'Name must be at least 3 characters long'],
    }
});

module.exports =  mongoose.model('dept', deptSchema)

