const express = require("express");

const usersController = require("../controller/users-controller");

const router = express.Router();

router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.post("/register", usersController.registerHandle);
router.post("/login", usersController.loginHandle);
router.get("/logout", usersController.logoutHandle);


module.exports = router;
