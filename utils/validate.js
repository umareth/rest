const { celebrate, Joi } = require("celebrate");

// его можно использовать и для создания юзера
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    work_time: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .regex(/^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/),
  }),
});

const validateGetMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateLoginUser,
  validateCreateUser,
  validateUser,
  validateCreateMovie,
  validateGetMovieId,
};
