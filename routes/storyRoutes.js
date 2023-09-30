/*******************************************************************
* This module is used to define all routes related to story requests
*******************************************************************/

//Since we are going to use express router object, we need to import express module
const express = require('express');

//router object
const router = express.Router();


/******************************************************************
* The seven REpresenational State Transfer (RESTful) routes (below)
* Start adding routes into this router object 
* HTTP Method   -   Path   -  Operation
*******************************************************************/

//GET /stories: send all stories to the user
router.get('/', (req, res) => { //change '/stories' to '/'
    res.send('send all stories');
});

//GET /stories/new: send HTML form for creating a new story
router.get('/new', (req, res) => { 
    res.send('send the new form');
});

//POST /stories: creat a new story
router.post('/', (req, res) => { 
    res.send('create a new story');
});

//GET /stories/:id send details of story indetified by id
router.get('/:id', (req, res) => { 
    res.send('send story with id ' + req.params.id);
});

//GET /stories/:id/edit: send html form for editing an existing story
router.get('/:id/edit', (req, res) => { 
    res.send('send the eidt form');
});

//PUT (used to update the story) / stories/:id update the story identified by id
router.put('/:id', (req, res) => { 
    res.send('update story with id ' + req.params.id);
});

//Delete /stories/:id: delete the story identified by id
router.delete('/:id', (req, res) => { 
    res.send('delete story with id ' + req.params.id);
});



/***********************************************************
* Export object router so we can use it later in other files
***********************************************************/
module.exports = router; 