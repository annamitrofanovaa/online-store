require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const session = require('express-session'); //
const app = express()
app.use(session({/////////
    secret: 'your-secret-key', // секретный ключ для подписи куки
    resave: false,
    saveUninitialized: false
})); ////////

const PORT = process.env.PORT || 5000




app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //изображения там
app.use(fileUpload({}))
//запросы из браузера
//app.get('/', (reg, res) => {
// res.status(200).json({message:'WORKING!!!'})
//})

//зададим каркас приложения
app.use('/api', router)

//обработка ошибок, последний Middleware
app.use(errorHandler)

//функция для подключения к бд
const start = async () => {
    try {
        await sequelize.authenticate() //с помощью нее подключаемс к бд
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}

start()
