const router = require("express").Router();

const validate = require("../utils/validate");
const { login, createUser, logOut } = require("../controllers/users"); // контроллеры
const { auth } = require("../middlewares/auth");
const NotFoundErr = require("../middlewares/errors/notFound");
const { ERROR_NOT_FOUND_ROUTE } = require("../utils/constants");

router.post("/signup", validate.validateCreateUser, createUser);
router.post("/signin", validate.validateLoginUser, login);

router.use(auth);

router.use("/users", require("./users"));
router.use("/admin", require("./movies"));

router.use("/signout", logOut);

router.use("*", (req, res, next) => {
  next(new NotFoundErr(ERROR_NOT_FOUND_ROUTE));
});

module.exports = router;
