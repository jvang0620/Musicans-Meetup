/*********************************************************************************
* This controller module consists of the call back functions from the route module
**********************************************************************************/



//import module event
//*Remember, whenever you import a module you specify yourself you need to include the path
const model = require('../models/event');


/***********************************************************
* Anonymous function set to exports.index. Can be call later.
***********************************************************/
exports.index = (req, res) => {
    // res.send('send all events'); //uncomment for testing
    // res.send(model.find()); //uncomment for testing

    let events = model.find();
    let getAllCategories = model.getAllCategories();
    
    res.render('./event/indexEvents.ejs', {events, getAllCategories});
};

/**********************
* Used to send new form
***********************/
exports.new = (req, res) => {
    //res.send('send the new form');
    res.render('./event/newEventForm.ejs');
};


/*******************************************************
* Creation of the new events. Create new object in array
********************************************************/
exports.create = (req, res) => {
    // res.send('Created a new event'); //uncomment for testing
    // console.log(req.body); //uncomment for testing

    let event = req.body;

    //Uncomment for testing
    // console.log(req.file);
    // console.log("File name:\n" + req.file.originalname) 
    event.image = '/images/img-upload/' + req.file.filename;

    //Uncomment for testing
    // console.log(event);

    model.save(event);
    res.redirect('/events');
};


/*************************
* Show details of an event 
**************************/
exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    // res.send('send event with id ' + req.params.id); //uncomment for testing
    // res.send(event); //For testing //uncomment for testing
    // res.render('./event/show', {event}); //uncomment for testing

    // if event is not undefined
    if(event) {
        res.render('./event/showEvent.ejs', {event});
    } else {
        //res.status(404).send('Cannot find event with id ' + id); //uncomment for testing
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};


/**********************
* For editing an event
***********************/
exports.edit = (req, res, next) => {
    
    let id = req.params.id;
    let event = model.findById(id);

    //if event is not undefined and it exists
    if(event) {
        res.render('./event/editEvent.ejs', {event}); 
    } 
    else {
        // res.status(404).send('Cannot find event with id ' + id); //uncomment for testing
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
    // res.send('send event edit form');
};


/**********************
* For updating an event
***********************/
exports.update = (req, res, next) => {
    // res.send('update event with id ' + req.params.id);
    let event = req.body;
    let id = req.params.id;

    //if req.file exist
    if(req.file) {
        event.image = '/images/img-upload/' + req.file.filename;
    }

    //if true
    if (model.updateById(id, event)) {
        res.redirect('/events/' + id);
    }
    else {
        // res.status(404).send('Cannot find event with id ' + id); //uncomment for testing
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};


/**********************
* For deleting an event
***********************/
exports.delete = (req, res, next) => {
    // res.send('delete event with id ' + req.params.id);
    let id = req.params.id;

    // //if true
    if (model.deleteById(id)) {
        res.redirect('/events');
    }
    else {
        // res.status(404).send('Cannot find sotry with id ' + id);
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

