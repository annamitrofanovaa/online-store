const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

/*sequelize.sync().then(async () => {
    // Создаем двух администраторов с уникальными паролями
    await User.bulkCreate([
        { email: 'admin1@gmail.com', password: 'admin1password', role: 'ADMIN' },
        { email: 'admin2@gmail.com', password: 'admin2password', role: 'ADMIN' },
    ]);

    console.log('Администраторы созданы успешно.');

    // Теперь вы можете продолжить создание других пользователей, которые будут иметь роль 'USER'
    // Например:
    await User.create({ email: 'user1@gmail.com', password: 'user1password' });

    console.log('Пользователь создан успешно.');
});*/

const Favorite = sequelize.define("favorite", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
});

const BookHistory = sequelize.define("book_history", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Review = sequelize.define("review_tree", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  parentId: { type: DataTypes.INTEGER },
  level: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Review.belongsTo(Review, { as: "parent", foreignKey: "parentId" });
Review.hasMany(Review, { as: "replies", foreignKey: "parentId" });

const Book = sequelize.define("book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  // rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  //   img: { type: DataTypes.STRING, allowNull: true },
});

const Author = sequelize.define("author", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Genre = sequelize.define("genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const BookInfo = sequelize.define("book_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const AuthorGenre = sequelize.define("author_genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Определение отношения многие ко многим между User и Book через FavoriteBook
User.belongsToMany(Book, {
  through: Favorite,
  // sourceKey: "userId",
  // targetKey: "id",
});
Book.belongsToMany(User, {
  through: Favorite,
  // sourceKey: "userId",
  // targetKey: "id",
});

Author.hasMany(Book);
Book.belongsTo(Author);

Genre.hasMany(Book);
Book.belongsTo(Genre);

Book.hasMany(BookInfo, { as: "info" });
BookInfo.belongsTo(Book);

Book.hasMany(BookHistory);
BookHistory.belongsTo(Book);

// User.hasMany(Review);
// Book.hasMany(Review);
// Review.belongsTo(User);
// Review.belongsTo(Book);

Author.belongsToMany(Genre, { through: AuthorGenre });
Genre.belongsToMany(Author, { through: AuthorGenre });

module.exports = {
  User,
  Favorite,
  Book,
  Author,
  Genre,
  AuthorGenre,
  BookInfo,
  Review,
  BookHistory,
};
