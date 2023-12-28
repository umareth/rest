const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = require("../utils/config");

const { ValidationError } = mongoose.Error;

const {
  SUCCESS_LOGOUT,
  SALT_ROUNDS_HASH,
  ERROR_DUPLICATE_ENTRY,
  ERROR_INCORRECT_DATA,
  STATUS_OK,
  ERROR_AUTHENTICATION,
  ERROR_NOT_FOUND,
  STATUS_CREATED,
} = require("../utils/constants");

const User = require("../models/user");

const NotFoundErr = require("../middlewares/errors/notFound");
const BadRequestErr = require("../middlewares/errors/badReq");
const ConflictErr = require("../middlewares/errors/confErr");
const UnauthorizedError = require("../middlewares/errors/errAuth");

const generateToken = (id) =>
  jwt.sign({ id }, NODE_ENV === "production" ? JWT_SECRET : "some-secret-key");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let userRole = "user"; // Значение по умолчанию для роли

    // ЗБТ функция Проверяем, если пользователь зарегистрирован через /admin
    if (req.originalUrl === "/admin") {
      userRole = "admin"; // Устанавливаем роль на 'admin'
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS_HASH);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: userRole,
    });
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    res.status(STATUS_CREATED).send(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictErr(ERROR_DUPLICATE_ENTRY));
    } else if (err instanceof ValidationError) {
      next(new BadRequestErr(ERROR_INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError(ERROR_AUTHENTICATION);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError(ERROR_AUTHENTICATION);
    }

    const token = generateToken(user._id);
    const cookieOptions = {
      maxAge: 6048000,
      httpOnly: true,
      sameSite: true,
    };

    res.cookie("jwt", token, cookieOptions);
    res.status(STATUS_OK).send({ token });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundErr(ERROR_NOT_FOUND);
    }

    return res.status(STATUS_OK).send(user);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestErr(ERROR_INCORRECT_DATA));
    }
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      { email, name },
      { new: true, runValidators: true }
    );

    return res.status(STATUS_OK).send(updatedProfile);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestErr(ERROR_INCORRECT_DATA));
    }
    if (err.code === 11000) {
      return next(new ConflictErr(ERROR_DUPLICATE_ENTRY));
    }

    return next(err);
  }
};

const logOut = (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(STATUS_OK).send({ message: SUCCESS_LOGOUT });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  logOut,
  updateUser,
  getCurrentUser,
};
