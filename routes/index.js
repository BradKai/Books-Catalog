const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/books', booksController.getAllBooks);
router.get('/books/:id', booksController.getBookById);
router.post('/add-book', booksController.createBook);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

module.exports = router;