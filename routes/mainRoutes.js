const express = require('express');
const mainController = require('../controllers/mainController'); 
const router = express.Router();

// GET /main/index: send index page to user
router.get('/', mainController.index);

// GET /main/about: send about page to user
router.get('/about', mainController.about);

// GET /main/contact: send contact page to user
router.get('/contact', mainController.contact);

module.exports = router;