const express = require('express');
const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateLogIn, validateSignup, validateResult} = require('../middlewares/validator');

const router = express.Router();

//GET /users/new: send html form for creating a new user account
router.get('/new', isGuest, userController.new);

//POST /users: create a new user account
router.post('/', isGuest, validateSignup, validateResult, userController.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest, userController.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', isGuest, logInLimiter, validateLogIn, validateResult, userController.login);

//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, userController.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, userController.logout);


module.exports = router;