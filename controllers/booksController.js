const Book = require('../models/models');
const multer = require('multer');
// Multer is a middleware for handling file uploads in Node.js web applications.
// It simplifies the process of receiving files from client requests, processing them,
// and storing them on the server or performing other operations, such as validation or transformation.
const formDataMiddleware = multer().none();

exports.getAllBooks = async (req, res)=>{
    try{
        const books = await Book.find();
        res.render('books', {books});
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.createBook = async (req, res) => {
    console.log(req.body);
    const newBook = req.body;
    try{
        const book = await Book.create(newBook);
        res.redirect('/books');
    }
    catch(error){
        res.status(500).json({message:"Error creating book", error: error.message});
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
        // res.redirect('/books');
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book", error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    formDataMiddleware(req, res, async () => {
        const update_book = req.body;
        if (update_book.status === null || update_book.status === undefined) {
            update_book.status = 'Unread';
        }
        try {
            const updated_book = await Book.findByIdAndUpdate(id, update_book, { new: true });
            
            if (!updated_book) {
                return res.status(404).json({ message: "Book not found" });
            }
            
            res.status(200).json(updated_book);
        } catch (error) {
            res.status(500).json({ message: "Error updating book", err: error.message });
        }
    });
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try{
        const deleted_book = await Book.findByIdAndDelete(id);
        if(!deleted_book){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(204).send();
    }
    catch(error){
        res.status(500).json({message: "Error deleting book", err: error.message});
    }
};