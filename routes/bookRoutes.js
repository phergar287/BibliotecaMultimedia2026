const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

router.get('/libros', protect, getBooks);

module.exports = router;
