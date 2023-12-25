const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
//const checkAuthentication = require('../middleware/checkAuthenticationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Operations with user's favorites
 */

/**
 * @swagger
 * /api/favorites/add:
 *   post:
 *     summary: Add a book to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *             required:
 *               - bookId
 *     responses:
 *       '200':
 *         description: Book added to favorites successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/add',  favoriteController.addToFavorites);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of user's favorite books
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/list', favoriteController.getFavoritesByUser);

/**
 * @swagger
 * /api/favorites/remove:
 *   delete:
 *     summary: Remove a book from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *             required:
 *               - bookId
 *     responses:
 *       '200':
 *         description: Book removed from favorites successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Book not found in favorites
 *       '500':
 *         description: Internal server error
 */
router.delete('/remove/:bookId', favoriteController.removeFromFavorites);

module.exports = router;
