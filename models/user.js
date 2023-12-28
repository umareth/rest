const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orders: [
    {
      // Копия информации о заказе
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
      dateTime: {
        type: Date,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
  ],
  // Дополнительные поля, если необходимо
});

module.exports = mongoose.model("User", userSchema);
