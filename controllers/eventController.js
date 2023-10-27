/*********************************************************************************
* This controller module consists of the call back functions from the route module
**********************************************************************************/

//require: import module event
const model = require('../models/event');


/***********************************************************
* Anonymous function set to exports.index. Can be call later.
***********************************************************/
exports.index = (req, res) => {
    model.find()
    .then(events => {
        let uniqueEvents = getAllCategories(events);
        res.render('./event/indexEvents.ejs', {events, getAllCategories: uniqueEvents});
    })
    .catch(err => next(err));
    
};

//helper function for exports.index (above)
function getAllCategories(events) {
    const uniqueEvents = {};

    events.forEach(event => {
        if (!uniqueEvents[event.category]) {
            uniqueEvents[event.category] = [];
        }
        uniqueEvents[event.category].push(event);
    });

    return uniqueEvents;
}



/**********************
* Used to send new form
***********************/
exports.new = (req, res) => {
    res.render('./event/newEventForm.ejs');
};


/*******************************************************
* Creation of the new events. Create new object in array
********************************************************/
exports.create = (req, res, next) => {

    let event = new model(req.body);//create a new event document
    event.image = '/images/img-upload/' + req.file.filename;

    //since save() method is an instance method. 
    //Also, this is how we insert the doc to the database
    event.save()
    .then((event) => {
        res.redirect('/events');
    })
    .catch(err => {
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
};


/*************************
* Show details of an event 
**************************/
exports.show = (req, res, next) => {
    let id = req.params.id;

    //an objectID is a 24-bit Hex String
    //id has to follow this pattern. It can only contain 0-9, lowercase/uppercase a through f, and has to be 24 digits. 
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid event id');
        err.status = 400;

        return next(err);
    }

    model.findById(id)
    .then(event => {
        // if event is not undefined
        if(event) {
            res.render('./event/showEvent.ejs', {event});
        } 
        else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
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
};


/**********************
* For updating an event
***********************/
exports.update = (req, res, next) => {
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
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};


/**********************
* For deleting an event
***********************/
exports.delete = (req, res, next) => {
    let id = req.params.id;

    // //if true
    if (model.deleteById(id)) {
        res.redirect('/events');
    }
    else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

