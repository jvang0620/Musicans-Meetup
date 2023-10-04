/*********************************************************
 ***************** Main Application  ********************* 
*********************************************************/



/****************
* require modules
*****************/
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override'); //once stalled 'npm i method-override', require it
const eventRoutes = require('./routes/eventRoutes'); //must import to be able to use


/****************
* create app
*****************/
const app = express();


/****************
 * configure app
*****************/
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs'); 


/******************
 * mount middleware
*******************/
//using this middleware function tells express where to locate the static files
app.use(express.static('public')); 

//using this middleware function allow me to parse data in the request body (b/c we need to deal with post request). It parse URL encoded data that users attach in the post request. By using this, it will store all the data as name-value pairs in the request body field. 
app.use(express.urlencoded({extended: true})); 

//using this middleware function helps log all requests and responses in the terminal
app.use(morgan('tiny')); 

//whenever we recieve a request, even though in HTML form we send a post request, that will be updated by the value of '_method' query string in our url https://www.npmjs.com/package/method-override
app.use(methodOverride('_method'));


/********************************************
 * set up routes
*********************************************/
//handles get request at this path '/'.It will render the landing page for the client
app.get('/', (req, res) => { 
    res.render('index.ejs'); // when we set EJS to our view engine, express knows all our view templetes are stored in the view folder
});

//route to about.ejs
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

//route to contact.ejs
app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});


//all prefix '/events' will be send to this router 'eventRoutes' to handle
app.use('/events', eventRoutes);


/***********************************************
* Error Handlers Below (Instead of using express
* error handler, we create our own)
************************************************/
//error handler that handles 404(Not Found error)
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;

    //call next default error handler with 'err' object
    next(err);
});


//Middleware error handler 
//Whenever you use 'next', passing 'err' as an argument, it calls this error handler
//This should be the last one in our stack, right above our 'listen function' and below
//all route in application
app.use((err, req, res, next) => {

    //allow programmer to see error but user can't see it
    console.log(err.stack); 
    
    //if err doesn't have any status
    if(!err.status) { 
        err.status = 500; //500 means internal server error

        //Since we don't want to show everything that happens on the server side to user when there's an error, we write our own message
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});


/**********************************************
 * start the server
***********************************************/
//let it listen at this particular port
app.listen(port, host, () => { 
    console.log('Server is running on port', port);
});