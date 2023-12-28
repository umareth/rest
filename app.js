// Импорты пакетов
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger"); // логгеры ошибок и запросов
const errorHandler = require("./middlewares/error-handler");

const { PORT, MONGO } = require("./utils/config"); // параметры
const router = require("./routes");
const cors = require("./middlewares/cors");
const limiter = require("./utils/limiter");

const app = express();

app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(express.json());

mongoose.connect(MONGO);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
