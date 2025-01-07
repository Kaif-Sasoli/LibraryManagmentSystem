//********** Book Schema **********/

const mongoose = require('mongoose')

// Copy of Book
const bookCopySchema = new mongoose.Schema({
    copyId: {
        type: 'string',
        required: true,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: false,
    }
});

// Book
const bookSchema = new mongoose.Schema({
     title: 
     { 
        type: String, 
        required: true 
    },
     author: {
         type: String,
         required: true
    },
     publisher: { 
        type: String, 
        required: true 
    },
     cost: { 
        type: Number, 
    },
     pages: { 
        type: Number, 
    },
     quantity: { 
        type: Number, 
        required: true,
        default: 1,
    },
    image: {
        type: String,
        required: true
    }, 
    bookCopies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'bookCopy',
    },
    
   },
   { timestamps: true}
);

const bookCopy = mongoose.model('BookCopy', bookCopySchema);
const book = mongoose.model('Book', bookSchema)

module.exports = { book, bookCopy}