//*******  Barrow Schema */
const mongoose = require('mongoose');

const barrowBookSchema = new mongoose.Schema({
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

// Hook or Middleware 
barrowBookSchema.pre('save', function (next) {
  mongoose.model('barrowBook').countDocuments({
      userId: this.userId,
      returnStatus: false,
  }).then(barrowBooksCount => {
      if (barrowBooksCount >= 3) {
          return next(new Error('You cannot borrow more than 3 books'));
      }

      return mongoose.model('barrowBook').countDocuments({
          bookId: this.bookId,
          returnStatus: false,
      });
  }).then(borrowedCopies => {
      const book = this.book;
      if (borrowedCopies >= book.quantity) {
          return next(new Error('No available copies of this book.'));
      }
      
        next();
  }).catch(error => next(error));
});
module.exports = mongoose.model('barrowBook',barrowBookSchema)

