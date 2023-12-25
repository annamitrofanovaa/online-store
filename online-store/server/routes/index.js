// routes/index.js

const express = require('express');
const router = express.Router();

// Подключите Swagger-комментарии
/**
 * @swagger
 * tags:
 *   name: Root
 *   description: Root endpoint
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get information about the API
 *     tags: [Root]
 *     responses:
 *       '200':
 *         description: Information about the API
 */
router.get('/', (req, res) => {
  res.json({ message: 'API Information' });
});

// Подключите остальные маршруты
const bookRouter = require('./bookRouter');
const favoriteRouter = require('./favoriteRouter');
const userRouter = require('./userRouter');
const genreRouter = require('./genreRouter');
const authorRouter = require('./authorRouter');
const adminRouter = require('./adminRouter');

router.use('/user', userRouter);
router.use('/favorite', favoriteRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/book', bookRouter);
router.use('/admin', adminRouter);

module.exports = router;
