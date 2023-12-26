const ApiError = require("../error/ApiError");
const { Review } = require("../models/models");

class ReviewController {
  async addReview(req, res, next) {
    try {
      const { text, userId, bookId, parentId } = req.body;

      const parentReview = await Review.findByPk(parentId);

      const level = parentReview ? parentReview.level + 1 : 0;

      const review = await Review.create({
        text,
        userId,
        bookId,
        parentId,
        level,
      });
      return res.json(review);
    } catch (error) {
      next(ApiError.internal("Unable to add review"));
    }
  }

  async getReviewsByBook(req, res, next) {
    try {
      const { bookId } = req.params;

      const reviews = await Review.findAll({
        where: { bookId },
        include: [
          {
            model: Review,
            as: "replies",
            include: [{ model: Review, as: "replies" }],
          },
        ],
      });

      return res.json(reviews);
    } catch (error) {
      next(ApiError.internal("Unable to get reviews"));
    }
  }

  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) {
        throw ApiError.notFound("Review not found");
      }

      await review.destroy();

      return res.json({ message: "Review deleted successfully" });
    } catch (error) {
      next(ApiError.internal("Unable to delete review"));
    }
  }
}

module.exports = new ReviewController();
