const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketBook = sequelize.define('basket_book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

/*const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})*/

const BookInfo = sequelize.define('book_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const AuthorGenre = sequelize.define('author_genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

//User.hasMany(Rating)
//Rating.belongsTo(User)

Basket.hasMany(BasketBook)
BasketBook.belongsTo(Basket)

Type.hasMany(Book)
Book.belongsTo(Type)

Genre.hasMany(Book)
Book.belongsTo(Genre)

//Book.hasMany(Rating)
//Rating.belongsTo(Book)

Book.hasMany(BasketBook)
BasketBook.belongsTo(Book)

Book.hasMany(BookInfo, {as: 'info'});
BookInfo.belongsTo(Book)

Author.belongsToMany(Genre, {through: AuthorGenre })
Genre.belongsToMany(Type, {through: AuthorGenre })

module.exports = {
    User,
    Basket,
    BasketBook,
    Book,
    Author,
    Genre,
   // Rating,
    AuthorGenre,
    BookInfo
}