const ApiError = require("../error/ApiError");
const { Review } = require("../models/models");

class ReviewController {
  async addReview(req, res, next) {
    const { userId, bookId, text } = req.body;

    try {
      const review = await Review.create({ userId, bookId, text });
      return res.json({ message: "Review added successfully", review });
    } catch (error) {
      return next(ApiError.internal("Unable to add review"));
    }
  }

  async getReviewsByBook(req, res, next) {
    const { bookId } = req.params;

    try {
      const reviews = await Review.findAll({
        where: { bookId },
      });

      return res.json({ reviews });
    } catch (error) {
      return next(ApiError.internal("Unable to get reviews for the book"));
    }
  }
}

module.exports = new ReviewController();
