const express = require("express");

const authController = require("../controller/auth-controller");

const router = express.Router();

router.get("/login", authController.login);
router.get("/register", authController.register);
router.post("/register", authController.registerHandle);
router.post("/login", authController.loginHandle);
router.get("/logout", authController.logoutHandle);

module.exports = router;
