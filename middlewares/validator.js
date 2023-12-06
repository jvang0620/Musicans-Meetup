// In terminal: npm install express-validator

const {body, validationResult} = require('express-validator');
const Event = require('../models/event');
const Rsvp = require('../models/rsvp');


//middleware function that validate ID
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


//middleware function that validate sign up inputs
exports.validateSignup = [
  body('firstName', 'First name field is required').notEmpty().trim().escape(),
  body('lastName', 'Last name field is required').notEmpty().trim().escape(),
  body('email', 'Email field is required').isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];


//middleware function that validate Log in inputs
exports.validateLogIn = [
  body('email', 'Email is not valid').notEmpty().isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be at least 8 characters and at most 64 characters').notEmpty().isLength({min: 8, max: 64})];


//middleware function that validate creating/editing event
exports.validateEvent = [
  body('category', 'Category is required').notEmpty()

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
  }).trim().escape(),

  //Orgingal code (Will leave this comment in case I need to revert back)
  // body('category', 'Category is required').notEmpty().isIn(Event.schema.path('category').enumValues).trim().escape(),

  //2nd change (Will leave this comment in case I want to make additional changes)
  // body('category').if((value, { req }) => req.body.category !== undefined).notEmpty().isIn(Event.schema.path('category').enumValues).withMessage('Category must be one of the following: Music Talk, Meet Up, Rehearsal, Song Writing, Try Outs, Others').trim().escape(),


  body('title', 'Title is required').notEmpty().trim().escape(),
  body('details', 'Details must be at least 10 characters').notEmpty().isLength({min: 10}).trim().escape(),
  body('startDateTime', 'Error! Start time must be after the current time!').notEmpty().isISO8601().isAfter().trim().escape(),
  body('endDateTime', 'Error!!! End time must be after start time!').notEmpty().isISO8601()

    //add custom validation function
    .custom((value, { req }) => {

      //parses the "endDateTime' string into Javascript Date object"
      end = Date.parse(value) 
      // Parses the startDateTime string from the request body into a JavaScript Date object
      start = Date.parse(req.body.startDateTime)  

      //if the 'startDateTime' is greater than or equal to the 'endDateTime' (EX: [StartDateTime (12/6/23 1pm) is greater than EndDateTime (12/1/23 1pm)]   or    [StartDateTime (12/1/23 1pm) is equal to EndDateTime (12/1/23 1pm)].
      if (start >= end) {
        throw new Error("Error! End time must be after start time!");
      }
      //the 'startDateTime' is less than the 'endDateTime' (EX: StartDateTime (12/6/23 1pm) is greater than EndDateTime (12/6/23 2pm)
      else {
        return true;
      }
    })
    .trim().escape(),
  body('location', 'Location is required').notEmpty().trim().escape(),
  body('image', 'Image is required')
    .custom((value, { req }) => {

      //check if the request method is POST
      if(req.method === 'POST') {

        // check if there are no files in the request
        if(!req.files) {
          // indicates validation failure, no image file provided
          return false;
        }
        // Check the file type and see if image file type is not one of these
        if(req.files.image.mimetype !== 'image/png' 
        && req.files.image.mimetype !== 'image/jpg' 
        && req.files.image.mimetype !== 'image/jpeg' 
        && req.files.image.mimetype !== 'image/gif') {
          // indicates validation failure, unsupported file type
          return false;
        }
      }
      else {
        // indicates validation success
        return true;
      }
    })
];


//middleware function that validate the RSVP status field to only be 'YES', 'NO', or 'MAYBE'
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


//Orginal exports.validateRsvp (Leave comment in case I want to revert back)
// exports.validateRsvp = [
//   body('status', 'RSVP cannot be empty').notEmpty().trim().escape(),
//   body('status', `RSVP can only be one of the following: ${Rsvp.schema.path('status').enumValues.join(', ')}`).trim().escape().isIn(Rsvp.schema.path('status').enumValues)
// ];


//middleware function that validate the result
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