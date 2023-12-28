const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  work_time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    validate: /^https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
