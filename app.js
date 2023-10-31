/*********************************************************
 ***************** Main Application  ********************* 
*********************************************************/



/****************
* require modules
*****************/
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override'); 
const eventRoutes = require('./routes/eventRoutes'); 
const mainRoutes = require('./routes/mainRoutes'); 
const mongoose = require('mongoose'); 

/****************
* create app
*****************/
const app = express();


/****************
 * configure app
*****************/
const port =  process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const dataBase_user = process.env.USER;
const dataBase_password = process.env.PASS;
const project = process.env.PROJECT;
let MongoDBAtlas_URL = `mongodb+srv://${dataBase_user}:${dataBase_password}@cluster0.gwzulku.mongodb.net/${project}?retryWrites=true&w=majority`; 
app.set('view engine', 'ejs'); 

/*************************
* Connect to mongoDB Atlas
**************************/
mongoose.connect(MongoDBAtlas_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    //if successful, start the server
    app.listen(port, host, () => { 
        console.log('Server is running on port', port);
    });
})
.catch(err => console.log(err.message));


/******************
 * mount middleware
*******************/
app.use(express.static('public')); 
app.use(express.urlencoded({extended: true})); 
app.use(morgan('tiny')); 
app.use(methodOverride('_method'));


// Routes ************************
app.use('/events', eventRoutes);
app.use('/', mainRoutes);


/***********************************************
* Error Handlers Below (Instead of using express
* error handler, we create our own).
* Error handler that handles 404(Not Found error)
************************************************/
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});


//Middleware error handler 
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