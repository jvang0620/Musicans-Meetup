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

    //create a new event document
    let event = new model(req.body);

    //check if req.file exist
    if (req.file) {
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
    } 
    else {
        // Handle the case if req.file DOES NOT exist
        let err = new Error('Event validation failed: image: Image is required, endDateTime: Ending time/date are required, startDateTime: Starting time/date are required, location: Location is required, details: Details is required, host: Host is required, category: Category is required, title: Title is required');
        err.status = 400;
        next(err);
    }
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

    //check if id a valid or not
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event => {

        //if event is not undefined and it exists
        if(event) {
            res.render('./event/editEvent.ejs', {event}); 
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
* For updating an event
***********************/
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    //check if id a valid or not
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    //if req.file exist
    if(req.file) {
        event.image = '/images/img-upload/' + req.file.filename;
    }

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true}) //adding the {useFindAndModify: false} arugment will get ride of the DeprecationWarning
    .then(event => {
        if(event) {
            res.redirect('/events/' + id);
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError')
            err.status = 400;
            next(err)
    });
};


/**********************
* For deleting an event
***********************/
exports.delete = (req, res, next) => {
    let id = req.params.id;

    //check if id a valid or not
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => { //returns a event that is being deleted
        if(event) { //if there is a event
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    }) 
    .catch(err => next(err));
};

