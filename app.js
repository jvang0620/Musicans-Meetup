/****************
* require modules
*****************/
const express = require('express');
const morgan = require('morgan');


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

//using this middleware function allow me to parse data in the request body (b/c we need to deal with post request)
app.use(express.urlencoded({extended: true})); 

//using this middleware function helps log all requests and responses in the terminal
app.use(morgan('tiny')); 


/********************************************
 * set up routes
*********************************************/
//handles get request at this path '/'.It will render the landing page for the client
app.get('/', (req, res) => { 
    res.render('index.ejs'); // when we set EJS to our view engine, express knows all our view templetes are stored in the view folder
});



/**********************************************
 * start the server
***********************************************/
//let it listen at this particular port
app.listen(port, host, () => { 
    console.log('Server is running on port', port);
});