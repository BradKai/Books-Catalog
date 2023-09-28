const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name:{type: String, required: true, unique: true},
    author:{type: String, required: true},
    genre:[{type: String}],
    description:{type: String, required: true},
    status:{type:String, default: "Unread"}
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;