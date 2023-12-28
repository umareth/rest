const REGEX = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;

const SALT_ROUNDS_HASH = 10;

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const SUCCESS_LOGOUT = 'Успешно произведен выход';
const SUCCESS_AUTH = 'Успешно произведен вход';
const SUCCESS_DEL = 'Фильм успешно удален';

const ERROR_INCORRECT_DATA = 'Ошибка: Переданы некорректные данные';
const ERROR_NOT_FOUND = 'Ошибка: Запрашиваемые данные не найдены';
const ERROR_NOT_ACCESS = 'Ошибка: У вас нет доступа к данным другого пользователя';
const ERROR_CONFIRMATION_REQUIRED = 'Ошибка: Требуется подтверждение';
const ERROR_DUPLICATE_ENTRY = 'Ошибка: Пользователь с такой почтой уже существует';
const ERROR_VALIDATION = 'Ошибка валидации данных';
const ERROR_AUTH_REQUIRED = 'Ошибка: Требуется авторизация';
const ERROR_DEFAULT = 'Произошла неизвестная ошибка';
const ERROR_INVALID_URL = 'Ошибка: Некорректный URL';
const ERROR_AUTHENTICATION = 'Ошибка аутентификации';
const ERROR_NOT_FOUND_ROUTE = 'Ошибка: проверьте правильность пути роутера';

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER = 500;

module.exports = {
  REGEX,
  SUCCESS_LOGOUT,
  DEFAULT_ALLOWED_METHODS,
  STATUS_OK,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_NOT_ACCESS,
  ERROR_CONFIRMATION_REQUIRED,
  ERROR_DUPLICATE_ENTRY,
  ERROR_VALIDATION,
  ERROR_AUTH_REQUIRED,
  ERROR_DEFAULT,
  ERROR_INVALID_URL,
  ERROR_AUTHENTICATION,
  SALT_ROUNDS_HASH,
  SUCCESS_AUTH,
  SUCCESS_DEL,
  STATUS_CREATED,
  ERROR_NOT_FOUND_ROUTE,
};
