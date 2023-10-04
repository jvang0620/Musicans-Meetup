/*******************************************************************
* This module is used to define all routes related to event requests
*******************************************************************/

//Since we are going to use express router object, we need to import express module
const express = require('express');

//In order to use eventOntroller.js, we must import it
const controller = require('../controllers/eventController');

//router object
const router = express.Router();


/******************************************************************
* The seven REpresenational State Transfer (RESTful) routes (below)
* Start adding routes into this router object 
* HTTP Method   -   Path   -  Operation
*******************************************************************/

//GET route /events: send all events to the user
router.get('/', controller.index);

//GET /events/new: send HTML form for creating a new event
router.get('/new', controller.new);

//Post /events: creat a new event
router.post('/', controller.create);

//GET /events/:id send details of event indetified by id
router.get('/:id', controller.show);

//GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', controller.edit);

//PUT (used to update the event) / events/:id update the event identified by id
router.put('/:id', controller.update);

//Delete /events/:id: delete the event identified by id
router.delete('/:id', controller.delete);



/***********************************************************
* Export object router so we can use it later in other files
***********************************************************/
module.exports = router; 