const { Router } = require('express');
const router = Router();
const bookController = require('../controllers/bookController');
const checkRole = require('../middleware/checkRoleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               genreId:
 *                 type: string
 *               authorId:
 *                 type: string
 *               info:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *             required:
 *               - name
 *               - price
 *               - genreId
 *               - authorId
 *               - img
 *     responses:
 *       '200':
 *         description: Book created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
//router.post('/', checkRole('ADMIN'), bookController.create);
router.post('/',  bookController.create);

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genreId
 *         schema:
 *           type: string
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of books
 *       '500':
 *         description: Internal server error
 */
router.get('/', bookController.getAll);

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single book
 *       '404':
 *         description: Book not found
 */
router.get('/:id', bookController.getOne);


/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', checkRole('ADMIN'), bookController.deleteBook);

/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Edit a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               genreId:
 *                 type: string
 *               authorId:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - genreId
 *               - authorId
 *     responses:
 *       '200':
 *         description: Book edited successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', checkRole('ADMIN'), bookController.editBook);

module.exports = router;
