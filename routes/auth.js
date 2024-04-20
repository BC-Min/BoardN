const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join, login, logout} = require('../controllers/auth');
const router = express.Router();

//POST /auth/join
// auth + /join
router.post('/join', isNotLoggedIn, join);

//POST /auth/login
router.post('/join', isNotLoggedIn, login);

//POST /auth/logout
router.post('/join', isLoggedIn, logout);

module.exports = router;