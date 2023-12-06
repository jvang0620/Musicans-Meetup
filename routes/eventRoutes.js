/*******************************************************************
* This module is used to define all routes related to event requests
*******************************************************************/

const express = require('express');
const eventController = require('../controllers/eventController');
const {fileUpload} = require('../middlewares/fileUpload'); 
const {isLoggedIn, isHost, isNotHost} = require('../middlewares/auth');
const {validateId, validateResult, validateEvent, validateRsvp} = require('../middlewares/validator');

//router object
const router = express.Router();


/******************************************************************
* The seven REpresenational State Transfer (RESTful) routes (below)
* Start adding routes into this router object 
* HTTP Method   -   Path   -  Operation
*******************************************************************/

//GET route /events: send all events to the user
router.get('/', eventController.index);

//GET /events/new: send HTML form for creating a new event
router.get('/new', isLoggedIn, eventController.new);

//Post /events: creat a new event
router.post('/', isLoggedIn, fileUpload, validateEvent, validateResult, eventController.create);

//GET /events/:id send details of event indetified by id
router.get('/:id', validateId, eventController.show);

//GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', validateId, isLoggedIn, isHost, eventController.edit);

//PUT (used to update the event) / events/:id update the event identified by id
router.put('/:id', validateId, isLoggedIn, fileUpload, isHost, validateEvent, validateResult, eventController.update);

//Delete /events/:id: delete the event identified by id
router.delete('/:id', validateId, isLoggedIn, isHost, eventController.delete);

// POST /events/:id/rsvp: handle all RSVP submissions
router.post('/:id/rsvp', isLoggedIn, validateId, isNotHost, validateRsvp, validateResult, eventController.rsvp);



/***********************************************************
* Export object router so we can use it later in other files
***********************************************************/
module.exports = router; 