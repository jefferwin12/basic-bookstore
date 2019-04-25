require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const express = require('express');
const router  = new express.Router();
const {getAllBooks, getSingleBook, addBook} = require('api/controllers/booksController');

router.get('/', getAllBooks);
router.get('/:id', getSingleBook);
// router.delete('/:id', deletebook);
router.post('/', addBook);
// router.put('/:id', editbook);

module.exports = router;