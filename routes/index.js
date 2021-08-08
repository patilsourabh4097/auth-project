const router = require("express").Router();

const { ensureAuthenticated } = require("../middleware/auth");
const indexController = require("../controller/index-controller");

router.get("/", indexController.welcome);
router.get("/dashboard", ensureAuthenticated, indexController.dashboard);

module.exports = router;
