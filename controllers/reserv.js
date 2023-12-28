const Booking = require("../models/reserv");
const Table = require("../models/table");
const {
  STATUS_CREATED,
  STATUS_OK,
  ERROR_NOT_FOUND,
} = require("../utils/constants");
const BadRequestErr = require("../middlewares/errors/badReq");
const NotFoundErr = require("../middlewares/errors/notFound");

const createBooking = async (req, res, next) => {
  try {
    const { tableId, dateTime, duration } = req.body;
    const userId = req.user.id; // Получаем ID текущего пользователя

    const table = await Table.findById(tableId);

    if (!table) {
      throw new NotFoundErr("Table not found");
    }

    const booking = await Booking.create({
      user: userId,
      table: tableId,
      duration,
    });

    res.status(STATUS_CREATED).json(booking);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
};
