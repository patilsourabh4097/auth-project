const { ensureAuthenticated } = require("../middleware/auth");
const indexController = require("../controller/index-controller");
const router = require("express").Router();

router.get("/", indexController.welcome);

router.get("/dashboard", ensureAuthenticated, indexController.dash);

module.exports = router;
