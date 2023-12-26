const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews management
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               parentId:
 *                 type: integer
 *             required:
 *               - text
 *               - userId
 *               - bookId
 *     responses:
 *       '200':
 *         description: Successfully added review
 *       '500':
 *         description: Internal server error
 */
router.post("/", reviewController.addReview);

/**
 * @swagger
 * /reviews/{bookId}:
 *   get:
 *     summary: Get reviews by book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Reviews by book
 *       '500':
 *         description: Internal server error
 */
router.get("/:bookId", reviewController.getReviewsByBook);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
