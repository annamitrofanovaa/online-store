// routes/bookInfoRouter.js

const Router = require("express");
const router = new Router();
const bookInfoController = require("../controllers/bookinfoController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: BookInfo
 *   description: Book information management
 */

/**
 * @swagger
 * /api/book-info:
 *   get:
 *     summary: Get all book information
 *     tags: [BookInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of book information
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, bookInfoController.getAllBookInfo);

// Добавьте другие маршруты, если необходимо

module.exports = router;
