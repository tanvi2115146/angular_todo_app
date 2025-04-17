
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { register, auth } = require('../controllers/user.Controller');




router.post('/signup', register);

router.post('/login',auth);

module.exports = router;
