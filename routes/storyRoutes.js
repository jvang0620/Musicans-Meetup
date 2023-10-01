/*******************************************************************
* This module is used to define all routes related to story requests
*******************************************************************/

//Since we are going to use express router object, we need to import express module
const express = require('express');

//In order to use storyCOntroller.js, we must import it
const controller = require('../controllers/storyController');

//router object
const router = express.Router();


/******************************************************************
* The seven REpresenational State Transfer (RESTful) routes (below)
* Start adding routes into this router object 
* HTTP Method   -   Path   -  Operation
*******************************************************************/

//GET route /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send HTML form for creating a new story
router.get('/new', controller.new);

//Post /stories: creat a new story
router.post('/', controller.create);

//GET /stories/:id send details of story indetified by id
router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing an existing story
router.get('/:id/edit', controller.edit);

//PUT (used to update the story) / stories/:id update the story identified by id
router.put('/:id', controller.update);

//Delete /stories/:id: delete the story identified by id
router.delete('/:id', controller.delete);



/***********************************************************
* Export object router so we can use it later in other files
***********************************************************/
module.exports = router; 