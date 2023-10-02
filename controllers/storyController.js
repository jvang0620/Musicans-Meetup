/********************************************
* This controller module consists of the call
* back functions from the route module
**********************************************/

//import module story
//*Remember, whenever you import a module you specify yourself you need to include the path
const model = require('../models/story');


//anonymous function set to exports.index. Can be call later.
exports.index = (req, res) => {
    // res.send('send all stories');
    // res.send(model.find());
    let stories = model.find();
    res.render('./story/index.ejs', {stories});
};

//used to send new form
exports.new = (req, res) => {
    //res.send('send the new form');
    res.render('./story/newEventForm.ejs');
};

//creation of the new stories. Create new object in array
exports.create = (req, res) => {
    // res.send('Created a new story');
    // console.log(req.body); //for testing
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

//For details
exports.show = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);
    // res.send('send story with id ' + req.params.id);
    // res.send(story); //For testing
    // res.render('./story/show', {story});

    // if story is not undefined
    // if(story) {
    //     res.render('./story/show', {story});
    // } else {
    //     //res.status(404).send('Cannot find sotry with id ' + id);
    //     let err = new Error('Cannot find a story with id ' + id);
    //     err.status = 404;
    //     next(err);
    // }

    //if story is not undefined and it exists
    if(story) {
        res.render('./story/showEvent.ejs', {story});
    } 
    else {
        res.status(404).send('SHOW Cannot find story with id ' + id);
    }
};

//for edit
exports.edit = (req, res, next) => {
    
    let id = req.params.id;
    let story = model.findById(id);

    //if story is not undefined and it exists
    if(story) {
        res.render('./story/edit.ejs', {story});
    } 
    else {
        res.status(404).send('EDIT Cannot find story with id ' + id);
        // let err = new Error('Cannot find a story with id ' + id);
        // err.status = 404;
        // next(err);
    }
    
    // res.send('send story edit form');
};

//for update
exports.update = (req, res) => {
    // res.send('update story with id ' + req.params.id);
    let story = req.body;
    let id = req.params.id;

    //if true
    if (model.updateById(id, story)) {
        res.redirect('/stories/' + id);
    }
    else {
        res.status(404).send('UPDATE Cannot find story with id ' + id);
        // let err = new Error('Cannot find a story with id ' + id);
        // err.status = 404;
        // next(err);
    }
};

//for delete
exports.delete = (req, res) => {
    // res.send('delete story with id ' + req.params.id);
    let id = req.params.id;

    // //if true
    if (model.deleteById(id)) {
        res.redirect('/stories');
    }
    else {
        res.status(404).send('Cannot find sotry with id ' + id);
        // let err = new Error('Cannot find a story with id ' + id);
        // err.status = 404;
        // next(err);
    }
};