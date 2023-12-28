// models/reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Change the type according to your needs (e.g., Date, String, etc.)
    required: true,
  },
  endTime: {
    type: String, // Change the type according to your needs (e.g., Date, String, etc.)
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
