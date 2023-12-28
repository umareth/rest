const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table");

// Маршрут для создания столика
router.post("/tables", tableController.createTable);

module.exports = router;
