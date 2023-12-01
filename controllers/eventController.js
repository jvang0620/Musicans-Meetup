/*********************************************************************************
* This controller module consists of the call back functions from the route module
**********************************************************************************/


//require: import module event
const User = require('../models/user');
const Rsvp = require('../models/rsvp');
const Event = require('../models/event');


/***********************************************************
* Anonymous function set to exports.index. Can be call later.
***********************************************************/
exports.index = (req, res, next) => {
    Event.find()
    .then(events => {
        let uniqueEvents = getAllCategories(events);

        // Fetch the user details using the user ID
        User.findById(req.session.user)
            .then(user => {
                // Pass both events, categories, and user objects to the view
                res.render('./event/indexEvents.ejs', { events, getAllCategories: uniqueEvents, user });
            })
            .catch(err => next(err));
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
    // Fetch the user details using the user ID
    User.findById(req.session.user)
        .then(user => {
            // Render the newEventForm.ejs view and pass the user object
            res.render('./event/newEventForm.ejs', { user });
        })
        .catch(err => next(err));
};


/*******************************************************
* Creation of the new events. Create new object in array
********************************************************/
exports.create = (req, res, next) => {

    //create a new event document
    let event = new Event(req.body);
    event.host = req.session.user; //store the id of current user in the host field

    //check if req.file exist
    if (req.file) {
        event.image = '/images/img-upload/' + req.file.filename;
        
        //since save() method is an instance method. 
        //Also, this is how we insert the doc to the database
        event.save()
        .then((event) => {
            req.flash('success', 'Event was created successfully');
            res.redirect('/events'); //return to events page
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

    Event.findById(id).populate('host', '_id firstName lastName')
    .then(event => {
        // Fetch the user details using the user ID
        User.findById(req.session.user)
            .then(user => {

                //check if an event and a user exist. If true, pass both event & user obejects to the view template
                if(event && user) {
                    res.render('./event/showEvent.ejs', {event, user});
                } 

                //implement this condition so guest can view event listing
                //if event exist
                else if (event) {
                    res.render('./event/showEvent.ejs', {event});
                }
                else {
                    let err = new Error(' with id ' + id);
                    err.status = 404;
                    next(err);
                }
            })
            .catch(err => next(err));
    })
    .catch(err => next(err));
};


/**********************
* For editing an event
***********************/
exports.edit = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id)
    .then(event => {

        // Fetch the user details using the user ID
        User.findById(req.session.user)
            .then(user => {
                // Pass both event and user objects to the view
                if(event && user) {
                    res.render('./event/editEvent.ejs', {event, user}); 
                } 
                else {
                    let err = new Error('Cannot find a event with id ' + id);
                    err.status = 404;
                    next(err);
                }
            })
            .catch(err => next(err));
    })
    .catch(err => next(err));
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

    Event.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true}) //adding the {useFindAndModify: false} arugment will get ride of the DeprecationWarning
    .then(event => {
        if(event) {
            req.flash('success', 'Event Was Updated Successfully!');
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

    Event.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => { //returns a event that is being deleted
        if(event) { //if there is a event
            req.flash('success', 'Event Was Deleted Successfully!');
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    }) 
    .catch(err => next(err));
};

/*************************
// Handle all RSVP submissions
**************************/
exports.rsvp = (req, res, next) => {

    //what the user selcted (Yes, NO, Maybe) will be in the req.body.status and assignmed to 'buttonSelected'.
    let buttonSelected = req.body.status;

    Rsvp.findOne({event: req.params.id, user: req.session.user})
    .then(rsvp => {
        if(rsvp) {
            //Uncomment to see what response is (for testing)
            // console.log(buttonSelected);

            Rsvp.findByIdAndUpdate(rsvp._id, {response: buttonSelected}, {useFindAndModify: false})
            .then(result => {
                // req.flash('success', `You have changed your RSVP from ${rsvp.status} to ${response}`);
                req.flash('success', `You have changed your RSVP to ${buttonSelected}`);
                res.redirect('/users/profile');
            })
            .catch(err => next(err));
        } 
        else {
            rsvp = new Rsvp({
                event: req.params.id,
                user: req.session.user,
                status: buttonSelected 
            });
            rsvp.save()
            .then(result => {
                req.flash('success', `You have RSVP with ${buttonSelected}`);
                res.redirect('/users/profile');
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
};