const router = require("express").Router();

const auth = require("../middleware/auth");
const indexController = require("../controller/index-controller");

router.get("/", indexController.welcome);
router.get("/dashboard", auth.ensureAuthenticated, indexController.dashboard);

module.exports = router;
