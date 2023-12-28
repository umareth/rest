const Table = require("../models/table");

const createTable = async (req, res, next) => {
  try {
    const { number, capacity, location, description, isAvailable } = req.body;

    const table = await Table.create({
      number,
      capacity,
      location,
      description,
      isAvailable: isAvailable || true, // Устанавливаем значение по умолчанию, если не указано
    });

    res.status(201).json(table);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTable,
};
