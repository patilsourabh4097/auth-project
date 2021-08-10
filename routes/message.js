const express = require("express");

const auth = require("../middleware/auth");
const messageController = require("../controller/message-controller");

const router = express.Router();

router.get("/", auth.ensureAuthenticated, messageController.createMsg);
router.post("/", auth.ensureAuthenticated, messageController.postMsg);

module.exports = router;
