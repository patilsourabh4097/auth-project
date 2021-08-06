const { ensureAuthenticated } = require("../middleware/auth");
const indexController = require("../controller/index-controller");
const router = require("express").Router();


//Home page
router.get("/", indexController.welcome);

//dashboard
router.get("/dashboard", ensureAuthenticated, indexController.dash);

module.exports = router;
