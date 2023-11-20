/*******************************************************************
* This module is used to define all routes related to event requests
*******************************************************************/

//Since we are going to use express router object, we need to import express module
const express = require('express');

//In order to use eventOntroller.js, we must import it
const eventController = require('../controllers/eventController');

//require fileUpload.js
const {fileUpload} = require('../middlewares/fileUpload'); //import to use middleware

const {isLoggedIn, isHost} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

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
router.post('/', isLoggedIn, fileUpload, eventController.create);

//GET /events/:id send details of event indetified by id
router.get('/:id', validateId, eventController.show);

//GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', validateId, isLoggedIn, isHost, eventController.edit);

//PUT (used to update the event) / events/:id update the event identified by id
router.put('/:id', validateId, isLoggedIn, isHost, fileUpload, eventController.update);

//Delete /events/:id: delete the event identified by id
router.delete('/:id', validateId, isLoggedIn, isHost,  eventController.delete);



/***********************************************************
* Export object router so we can use it later in other files
***********************************************************/
module.exports = router; 