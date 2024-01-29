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
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose'); 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./models/user');

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
let MongoDBAtlas_URL = `mongodb+srv://jv2710:wt6RBlbFBDvHlr0M@cluster0.gwzulku.mongodb.net/nbda-project3?retryWrites=true&w=majority`; 
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
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: MongoDBAtlas_URL}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {

    //if user's session exist
    if (req.session.user) {

        // Fetch the user details using the user ID
        User.findById(req.session.user)

            // function is used to execute the query
            .exec() 

            // Promises syntax. When the query is successfully executed, the 'then' block is executed
            .then((user) => {

                //storing currect user's session into res.locals user variable
                //If user session doesn't exist, then res.locals user variable is set to 'null'
                res.locals.user = user || null;

                //If user exists, it sets res.locals.username to user.username. Otherwise, set to null
                res.locals.username = user ? user.username : null;

                //If user exists, it sets res.locals.firstName to user.firstName. Otherwise, set to null
                res.locals.firstName = user ? user.firstName : null;

                //set the locals error/success messages to flash's error/success messages
                res.locals.errorMessages = req.flash('error');
                res.locals.successMessages = req.flash('success');

                next();
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    } else {
        res.locals.user = null;
        res.locals.username = null;
        res.locals.firstName = null;
        res.locals.errorMessages = req.flash('error');
        res.locals.successMessages = req.flash('success');
        next();
    }
});

app.use(express.static('public')); 
app.use(express.urlencoded({extended: true})); 
app.use(morgan('tiny')); 
app.use(methodOverride('_method'));


// Routes ************************
app.use('/events', eventRoutes);
app.use('/', mainRoutes);
app.use('/users', userRoutes);


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