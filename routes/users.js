const express = require('express');
const router = express.Router()
const usersController = require('../controller/users-controller')

//Login-page
router.get('/login', usersController.login )

//Register page
router.get('/register', usersController.register)

//Register handle
router.post('/register', usersController.registerHandle);

//Login handle
router.post('/login',usersController.loginHandle)

//logout handle
router.get('/logout', usersController.logoutHandle)


module.exports = router;