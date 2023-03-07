// load environment variables
require('dotenv').config();

// packages
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");

// routing file paths
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));
async function main() {
	await mongoose.connect(process.env.MONGODB_URL);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', indexRouter);
app.use('/blog', blogRouter);

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
