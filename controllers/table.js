const Reservation = require("../models/table");
const { STATUS_CREATED, STATUS_OK } = require("../utils/constants");
const BadRequestErr = require("../middlewares/errors/badReq");
const NotFoundErr = require("../middlewares/errors/notFound");

const createReservation = async (req, res, next) => {
  try {
    const { user, restaurant, tableNumber, date, startTime, endTime } =
      req.body;

    const newReservation = await Reservation.create({
      user: req.user.id,
      restaurant,
      tableNumber,
      date,
      startTime,
      endTime,
    });

    res.status(STATUS_CREATED).send(newReservation);
  } catch (err) {
    next(err);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      throw new NotFoundErr("Reservation not found.");
    }

    reservation.isCancelled = true;
    await reservation.save();

    res
      .status(STATUS_OK)
      .send({ message: "Reservation cancelled successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReservation,
  cancelReservation,
};
