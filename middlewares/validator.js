/******************************************************************
* This class is used to enhanced security of the Server-side inputs
******************************************************************/


// In terminal: npm install express-validator

const {body, validationResult} = require('express-validator');
const Event = require('../models/event');
const Rsvp = require('../models/rsvp');


/*************************************
* middleware function that validate ID 
*************************************/
exports.validateId = (req, res, next) => {
    const id = req.params.id;

    //an objectID is a 24-bit Hex String
    //id has to follow this pattern. It can only contain 0-9, lowercase/uppercase a through f, and has to be 24 digits.
    //checks if the route parameter is NOT a valid ObjectId type value
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
      let err = new Error('Invalid event id');
      err.status = 400;
      next(err);
    } 
    next();
}


/*************************************************
* middleware function that validate sign up inputs
**************************************************/
exports.validateSignup = [
  body('firstName', 'First name field is required').notEmpty().trim().escape(),
  body('lastName', 'Last name field is required').notEmpty().trim().escape(),
  body('email', 'Email field is required').notEmpty().isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').notEmpty().trim().isLength({min: 8, max: 64})
];


/*************************************************
* middleware function that validate Log in inputs
**************************************************/
exports.validateLogIn = [
  body('email', 'Email is not valid. Should be a format like this: (example@example.com)').notEmpty().isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').notEmpty().trim().isLength({min: 8, max: 64})
];


/*********************************************************
* middleware function that validate creating/editing event
*********************************************************/
exports.validateEvent = [
  body('category', 'Category is required')

  //add custom validation function
  .custom((value, { req }) => {

    //checks if the category value is included in the allowed enum values specified in the Event schema
    // If not, it throws an error with a message specifying the valid options.
    if (!Event.schema.path('category').enumValues.includes(value)) {
      throw new Error(`Category must be one of the following: ${Event.schema.path('category').enumValues.join(', ')}`);
    }
    //otherwise, return true
    else {
      return true;
    }
  }).notEmpty().trim().escape(),

  body('title', 'Title is required').notEmpty().trim().escape(),
  body('details', 'Details must be at least 10 characters').notEmpty().isLength({min: 10}).trim().escape(),
  body('startDateTime', 'Error! Start time must be after the current time!').notEmpty().isISO8601().isAfter().trim().escape(),
  body('endDateTime', 'Error! End time must be after start time!').notEmpty().isISO8601()

    //add custom validation function
    .custom((value, { req }) => {

      //parses the "endDateTime' string into Javascript Date object"
      end = Date.parse(value) 
      // Parses the startDateTime string from the request body into a JavaScript Date object
      start = Date.parse(req.body.startDateTime)  

      //if the 'startDateTime' is greater than or equal to the 'endDateTime' 
      //(EX: [StartDateTime (12/6/23 1pm) is greater than EndDateTime (12/1/23 1pm)]   
      //or    [StartDateTime (12/1/23 1pm) is equal to EndDateTime (12/1/23 1pm)].
      if (start >= end) {
        throw new Error("Error! End time must be after start time!");
      }
      //the 'startDateTime' is less than the 'endDateTime' 
      //(EX: StartDateTime (12/6/23 1pm) is greater than EndDateTime (12/6/23 2pm)
      else {
        return true;
      }
    })
    .trim().escape(),
  body('location', 'Location is required').notEmpty().trim().escape(),
  body('image', 'Image is required').notEmpty(),

];


/*******************************************************************************************
* middleware function that validate the RSVP status field to only be 'YES', 'NO', or 'MAYBE'
********************************************************************************************/
exports.validateRsvp = [
  body('status')
    .notEmpty().withMessage('RSVP cannot be empty')

    //add custom validation function
    .custom((value) => {

      //checks if the status value is included in the allowed enum values defined in the Rsvp schema.
      // If not, it throws an error with a custom message indicating the allowed values.
      if (!Rsvp.schema.path('status').enumValues.includes(value)) {
        throw new Error(`RSVP must be one of the following: ${Rsvp.schema.path('status').enumValues.join(', ')}`);
      }
      else {
        return true;
      }
    })
    .trim().escape(),
];


/*********************************************
* middleware function that validate the result
*********************************************/
exports.validateResult = (req, res, next) => {
  //validationResult takes 'req' object
  let errors = validationResult(req);

  //if errors IS NOT empty, that means the validation didn't pass
  if(!errors.isEmpty()) {
      //convert error into an array, afterward loop through array
      //for each method we have in the array, add them in flash
      errors.array().forEach(error => {
          //add error message into flash
          req.flash('error', error.msg);
      });
      //redirect user back to previous page (login page)
      return res.redirect('back');
  }
  //else, errors is empty
  else {
      //return next middleware function
      return next();
  }
}