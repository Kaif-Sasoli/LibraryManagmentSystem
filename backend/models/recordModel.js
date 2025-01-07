//*******  Record Schema */
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true
      },
      returnStatus: {
        type: Boolean,
        default: false,
      },
      returnDate: {
        type: Date,
        required: true,
      },
    },
    {timestamps: true}
);

module.exports = mongoose.model('record',recordSchema)

