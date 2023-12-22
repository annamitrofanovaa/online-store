require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const router = require("./routes/index");

const session = require("express-session");
const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT;

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: "*",
  exposedHeaders: "*",
};

// app.options("*", cors(corsOptions));
app.use(cors());

// app.use(
//   cors({
//     origin: "*", // Укажите адрес вашего фронтенд-приложения
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Установите в true, если используете куки, авторизацию через заголовок запроса и т.п.
//   })
// );
// app.use(express.json());
// app.use(express.static(path.resolve(__dirname, "static")));
// app.use(fileUpload());

app.use("/api", router);

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
