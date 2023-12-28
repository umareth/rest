// controllers/order.js
const Order = require("../models/order");
const { STATUS_CREATED, STATUS_OK } = require("../utils/constants");
const BadRequestErr = require("../middlewares/errors/badReq");

const createOrder = async (req, res, next) => {
  try {
    const { user, items, totalAmount } = req.body;

    const newOrder = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    res.status(STATUS_CREATED).send(newOrder);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.menuItem");
    res.status(STATUS_OK).send(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
