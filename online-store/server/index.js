require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const session = require("express-session");
const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*", // Укажите адрес вашего фронтенд-приложения
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};

// Обработка CORS для определенного маршрута
app.use("/api/*", cors(corsOptions));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload());

app.use("/api", router);

// // // Обработка маршрутов
// const userRouter = require("./routes/userRouter");
// const bookRouter = require("./routes/bookRouter");
// const authorRouter = require("./routes/authorRouter");
// const genreRouter = require("./routes/genreRouter");
// const adminRouter = require("./routes/adminRouter");
// const favoriteRouter = require("./routes/favoriteRouter");
// const bookInfoRouter = require("./routes/bookinfoRouter");

// // // Использование маршрутов
// app.use("/api/user", userRouter);
// app.use("/api/book", bookRouter);
// app.use("/api/author", authorRouter);
// app.use("/api/genre", genreRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/favorite", favoriteRouter);
// app.use("/api/bookinfo", bookInfoRouter);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

// Подключение Swagger UI
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "Your API description",
    },
  },
  apis: ["./routes/*.js"], // Путь к вашим маршрутам
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Функция для подключения к БД
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
