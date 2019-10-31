var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const db = "mongodb+srv://li2918:cs307@cluster0-kw4yb.mongodb.net/login-test?retryWrites=true&w=majority";


var app = express();

// passport config
require("./config/passport")(passport);

// Database
mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.on("error", function (error) {
  console.log("Fail to connect to mongoDB.", error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to mongoDB!");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session middle ware
app.use(
    // value of secret doesn't matter
    session({
      secret: 'Hidetaka_Miyazaki',
      resave: true,
      saveUninitialized: true
    })
  );

// connect Flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Vars, assign vars to msgs
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error');
    next();
});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// routing
app.use('/', require('./routes/index'));
app.use('/info', require('./routes/info'));
app.use('/veri', require('./routes/veri'));
app.use('/map', require('./routes/map'));
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));


//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
