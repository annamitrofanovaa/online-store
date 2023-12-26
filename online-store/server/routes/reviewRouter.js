// routers/reviewRouter.js
const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");
// const checkRole = require("../middleware/checkRoleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book reviews
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               text:
 *                 type: string
 *             required:
 *               - userId
 *               - bookId
 *               - text
 *     responses:
 *       '200':
 *         description: Review added successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post("/", reviewController.addReview);
router.get("/:bookId", reviewController.getReviewsByBook);

// Добавьте другие маршруты, если необходимо

module.exports = router;
