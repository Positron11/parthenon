// load environment variables
require('dotenv').config();

// packages
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const logger = require('morgan');
const compression = require('compression');
const flash = require('express-flash');
const passport = require('passport');
const url = require('url')

// custom middleware imports
const authMiddleware = require("./middleware/auth_middleware");

// routing file paths
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

// models
const User = require('./models/user');

const app = express();

// set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// connect to database
const connect_db = async () => {
	return await mongoose.connect(process.env.MONGODB_URL);
}

// connect to database and then start listening for requests
connect_db().then(conn => {
	console.log(`MongoDB connected: ${conn.connection.host}`);
	app.listen(() => console.log("Listening for requests"));
}).catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// external middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
	secret: process.env.MONGODB_URL
}));
app.use(compression());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// custom middleware
app.use(authMiddleware.sessionAuthData);

// global variables
app.use(function(req, res, next) {
	res.locals.protocol = req.protocol;
	res.locals.host = req.get("host");
	res.locals.url = url.parse(req.originalUrl || req.url).pathname;
	return next();
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/writings', blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.status = err.status;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error", {
		title: err.status
	});
});

// passport Local Strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;
