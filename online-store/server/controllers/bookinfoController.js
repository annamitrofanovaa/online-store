const ApiError = require("../error/ApiError");
const { BookInfo } = require("../models/models");

class BookInfoController {
  async getAllBookInfo(req, res, next) {
    try {
      const bookInfoList = await BookInfo.findAll({
        attributes: ["description"],
      });
      return res.json(bookInfoList);
    } catch (error) {
      return next(ApiError.internal("Unable to get book info list"));
    }
  }

  // Добавьте другие методы, если необходимо
}

module.exports = new BookInfoController();
