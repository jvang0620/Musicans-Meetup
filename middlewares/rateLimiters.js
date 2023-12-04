// in terminal: npm i express-rate-limit

const rateLimiter = require("express-rate-limit");

//create new middleware function called 'logInLimiter'
//defind the 'logInLimter' function by calling the 'rateLimit()' method
//'rateLimit()' method will only talk one option object
//This middle keep track of the request from the client (from an ip address) and if any ip address sends more than 5 request in a 1 minute (60 * 1000) time window, it will send a error message back
exports.logInLimiter = rateLimiter({
    windowMs: 60 * 1000, //time window (1 minute)
    max: 5, //maximum 5 request
    //message: 'Too many login request. Try again later'
    handler: (req, res, next) => {
        let err = new Error('Too many login requests. Try again later.'); //create a new error message by creating an new object
        err.status = 429; // 429 code means too many request
        return next(err); //call default error handler
    }
});