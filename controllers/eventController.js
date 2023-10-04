/*********************************************************************************
* This controller module consists of the call back functions from the route module
**********************************************************************************/



//import module event
//*Remember, whenever you import a module you specify yourself you need to include the path
const model = require('../models/event');


//anonymous function set to exports.index. Can be call later.
exports.index = (req, res) => {
    // res.send('send all events');
    // res.send(model.find());
    let events = model.find();
    // let allCategories = model.getAllCategories();
    
    // res.render('./event/indexEvents.ejs', {events, allCategories});
    res.render('./event/indexEvents.ejs', {events});
};

//used to send new form
exports.new = (req, res) => {
    //res.send('send the new form');
    res.render('./event/newEventForm.ejs');
};

//creation of the new events. Create new object in array
exports.create = (req, res) => {
    // res.send('Created a new event');
    // console.log(req.body); //for testing

    let event = req.body;
    model.save(event);
    res.redirect('/events');

    // let event = req.body;
    // model.save(event);
    // let id = req.params.id;
    // res.redirect('/events/' + id);
};

//For details
exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    // res.send('send event with id ' + req.params.id);
    // res.send(event); //For testing
    // res.render('./event/show', {event});

    // if event is not undefined
    if(event) {
        res.render('./event/showEvent.ejs', {event});
    } else {
        //res.status(404).send('Cannot find event with id ' + id);
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

//for edit
exports.edit = (req, res, next) => {
    
    let id = req.params.id;
    let event = model.findById(id);

    //if event is not undefined and it exists
    if(event) {
        res.render('./event/editEvent.ejs', {event});
    } 
    else {
        // res.status(404).send('Cannot find event with id ' + id);
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
    // res.send('send event edit form');
};

//for update
exports.update = (req, res, next) => {
    // res.send('update event with id ' + req.params.id);
    let event = req.body;
    let id = req.params.id;

    //if true
    if (model.updateById(id, event)) {
        res.redirect('/events/' + id);
    }
    else {
        // res.status(404).send('Cannot find event with id ' + id);
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

//for delete
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

