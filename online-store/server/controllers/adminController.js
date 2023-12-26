const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class AdminController {
  async assignRole(req, res, next) {
    try {
      const { email, newRole } = req.body;
      console.log(
        "!!!!!!!!!!!!Идентификатор пользователя для изменения роли:",
        userId
      );

      const currentUserId = req.session.userId;
      //const session = req.session;
      // console.log('!!!!!!!Сессия пользователя:', session);
      // if (!currentUserId) {
      //   return next(ApiError.internal('Пользователь не авторизован.'));
      // }

      // const currentUser = await User.findByPk(currentUserId);
      // if (!currentUser || currentUser.role !== "ADMIN") {
      //   return next(
      //     ApiError.internal("Только администраторы могут изменять роли.")
      //   );
      // }

      const user = await User.findByPk(email);
      if (!user) {
        return next(ApiError.internal("Пользователь не найден."));
      }

      //await user.setRoles([newRole]);
      await user.update({ role: newRole });

      res.json({ message: "Роль пользователя успешно изменена." });
    } catch (error) {
      console.error(error);
      next(ApiError.internal("Ошибка в контроллере assignRole"));
    }
  }
}

module.exports = new AdminController();
