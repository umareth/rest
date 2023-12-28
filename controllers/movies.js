const Movie = require("../models/restaurants");
const MenuItem = require("../models/MenuItem");

const {
  STATUS_OK,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_NOT_ACCESS,
  SUCCESS_DEL,
  STATUS_CREATED,
} = require("../utils/constants");
const BadRequestErr = require("../middlewares/errors/badReq");
const NotFoundErr = require("../middlewares/errors/notFound");
const ForbiddenErr = require("../middlewares/errors/errForbidden");

// Получить все фильмы пользователя
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => res.status(STATUS_OK).json(movies))
    .catch(next);
};

// Создать новый фильм
const createMovie = (req, res, next) => {
  const movieData = {
    owner: req.user.id,
    ...req.body,
  };

  Movie.create(movieData)
    .then((newMovie) => res.status(STATUS_CREATED).send(newMovie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestErr(ERROR_INCORRECT_DATA));
      }
      return next(err); // Вернуть значение из catch блока
    });
};

const deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;
    // Находим фильм
    const movie = await Movie.findById(_id);
    // Проверяем, существует ли фильм
    if (!movie) {
      throw new NotFoundErr(ERROR_NOT_FOUND);
    }
    // Проверяем права доступа текущего пользователя на удаление фильма
    if (movie.owner.toString() !== req.user.id) {
      throw new ForbiddenErr(ERROR_NOT_ACCESS);
    }
    // Удаляем фильм
    const deletedMovie = await Movie.findByIdAndRemove(_id);
    if (!deletedMovie) {
      throw new NotFoundErr(ERROR_NOT_FOUND);
    }
    // Возвращаем успешный статус и сообщение
    return res.status(STATUS_OK).json(SUCCESS_DEL);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new NotFoundErr(ERROR_INCORRECT_DATA));
    }
    return next(err);
  }
};

// Получить все блюда для конкретного ресторана
const getRestaurantMenuItems = async (req, res, next) => {
  try {
    const { _id } = req.params;

    // Проверяем существование ресторана
    const restaurantExists = await Movie.findById(_id);
    if (!restaurantExists) {
      throw new NotFoundErr("Ресторана с таким id нету");
    }

    const menuItems = await MenuItem.find({ restaurant: _id });

    res.status(STATUS_OK).send(menuItems);
  } catch (err) {
    next(new BadRequestErr(err.message));
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { name, description, price } = req.body;

    // Проверяем существование ресторана
    const restaurantExists = await Movie.findById(_id);
    if (!restaurantExists) {
      throw new NotFoundErr("Restaurant not found");
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      restaurant: _id,
    });

    res.status(STATUS_CREATED).send(menuItem);
  } catch (err) {
    next(new BadRequestErr(err.message));
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params; // Получаем ID блюда из параметров запроса
    const userId = req.user.id; // Получаем ID текущего пользователя

    const menuItem = await MenuItem.findById(menuItemId).populate("restaurant"); // Находим блюдо и заполняем информацию о ресторане

    if (!menuItem) {
      throw new NotFoundErr(ERROR_NOT_FOUND); // Если блюдо не найдено, возвращаем ошибку
    }

    const { restaurant } = menuItem;

    // Проверяем, что текущий пользователь соответствует владельцу ресторана, к которому принадлежит блюдо
    if (restaurant.owner.toString() !== userId) {
      throw new ForbiddenErr(ERROR_NOT_ACCESS); // Если текущий пользователь не является владельцем ресторана, возвращаем ошибку доступа
    }

    await MenuItem.findByIdAndRemove(menuItemId); // Удаляем блюдо из базы данных

    res.status(STATUS_OK).json(SUCCESS_DEL); // Возвращаем успешный статус и сообщение об удалении
  } catch (err) {
    next(err);
  }
};

const editMenuItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params; // Получаем ID блюда из параметров запроса
    const userId = req.user.id; // Получаем ID текущего пользователя

    const updatedFields = req.body; // Обновляемые поля карточки

    const menuItem = await MenuItem.findById(menuItemId).populate("restaurant"); // Находим блюдо и заполняем информацию о ресторане

    if (!menuItem) {
      throw new NotFoundErr(ERROR_NOT_FOUND); // Если блюдо не найдено, возвращаем ошибку
    }

    const { restaurant } = menuItem;

    // Проверяем, что текущий пользователь соответствует владельцу ресторана, к которому принадлежит блюдо
    if (restaurant.owner.toString() !== userId) {
      throw new ForbiddenErr(ERROR_NOT_ACCESS); // Если текущий пользователь не является владельцем ресторана, возвращаем ошибку доступа
    }

    // Обновляем информацию о карточке
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedFields,
      { new: true }
    );

    res.status(STATUS_OK).json(updatedMenuItem); // Возвращаем обновленную карточку
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  getRestaurantMenuItems,
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
};
