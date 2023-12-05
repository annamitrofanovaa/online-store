require('dotenv').config()

const express = require('express')

const sequelize = require('./db')

const models = require('./models/models')

const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
//запросы из браузера
//app.get('/', (reg, res) => {
   // res.status(200).json({message:'WORKING!!!'})
//})

//зададим каркас приложения
app.use('/api', router)

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
