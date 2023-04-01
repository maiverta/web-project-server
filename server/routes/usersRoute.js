const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const user_controller = require ('../controllers/userController');
const auth = require("../middleware/auth");



//endpoint for signing up
router.post('/signup', user_controller.user_create);

//endpoint for logging in
router.post('/login', user_controller.user_login);

//endpoint for getting user profile
router.get('/:username', user_controller.user_getByUsername);

//endpoint for getting all user
router.get('/', user_controller.user_getUsers);

// endpoint for deleting user
router.delete('/:username', user_controller.user_delete);

//endpoint for update user
router.put('/:username' ,auth ,user_controller.user_update);


module.exports = router;