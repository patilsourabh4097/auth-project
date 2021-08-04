const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv')
dotenv.config()


//passport config
require('./config/passport')(passport);


// connect to MONGO
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'mongo connection error'))


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
 
//Body-parser middleware
app.use(express.urlencoded({extended:false}));

// Express session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//Global vars
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


//PORT
PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server has started on port ${PORT}`))