// Импорт пакетов
const router = require('express').Router();

// Импорт схемы валидации
const { validateUser } = require('../utils/validate');
const { getCurrentUser, updateUser } = require('../controllers/users'); // контроллеры

router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;
