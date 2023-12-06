const Event = require('../models/event');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    //If user is logged in, there is a user in the session
    //check if there is NO user in session
    if(!req.session.user) {
        //if the user is NOT in session, that means it's a guest
        //therefore, move on the the next middleware function
        return next();
    }
    //Otherwise, there is a user in session
    else {
        //display error message in front end
        req.flash('error', 'You are logged in already');
        //redirect users back to the profile page
        return res.redirect('/users/profile');
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {

    //check if user IS LOGGED IN
    if(req.session.user) {
        //move to next middleware function
        return next();
    }
    else {
        //display messge
        req.flash('error', 'You need to log in first');
        //redirect users back to login page
        return res.redirect('/users/login');
    }
};

//check if user is host of the event
exports.isHost = (req, res, next) => {
    let id = req.params.id;

    Event.findById(id)
    .then(event => {
        //if event exist
        if(event) {

            //compare with hosts to see if they're the same
            if(event.host == req.session.user) {
                //if true, user can move on to perform all operations
                return next();
            }
            //otherwise, both authors are NOT the same
            else {
                //display error mesage
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
        //if event is NOT found
        else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//check if user IS NOT the host of the event
exports.isNotHost = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
    .then(event => {
        if(event) {
            //if the host ARE NOT the same
            if(event.host != req.session.user) {
                next();
            } 
            //otherwise, if they are the same
            else {
                let err = new Error('Unauthorized Access to resource. Cannot RSVP to your own event!');
                err.status = 401;
                next(err);
            }
        } 
        else {
            let err = new Error(`Cannot find event with id ${id}`);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
  }