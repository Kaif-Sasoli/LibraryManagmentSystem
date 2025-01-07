//*******  Fine Schema */
const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
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
      overDueStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
      },
        fineAmount: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('fineSchema',fineSchema)