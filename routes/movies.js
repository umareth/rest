const router = require("express").Router();
const validate = require("../utils/validate");

const {
  getMovies,
  createMovie,
  deleteMovie,
  createMenuItem,
  getRestaurantMenuItems,
  deleteMenuItem,
  editMenuItem,
} = require("../controllers/movies");

const { createOrder } = require("../controllers/order");
const { createReservation } = require("../controllers/table");

router.get("/", getMovies);
router.post("/", validate.validateCreateMovie, createMovie);
router.delete("/:_id", validate.validateGetMovieId, deleteMovie);
router.delete("/:_id", validate.validateGetMovieId, deleteMovie);

router.post("/food/:_id", createMenuItem);
router.get("/food/:_id", getRestaurantMenuItems);
router.delete("/food/:menuItemId", deleteMenuItem);
router.patch("/food/:menuItemId", editMenuItem);

router.post("/order", createOrder);

router.post("/table", createReservation);

module.exports = router;
