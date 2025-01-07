const mongoose = require('mongoose');

const degreeProgramSchema = mongoose.Schema({
    degreeName: {
        type: 'string',
        required: true,
        minLength: [3, 'Name must be at least 3 characters long'],
    },
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'dept',
    }
})

 module.exports = mongoose.model('degreeProgram', degreeProgramSchema)
