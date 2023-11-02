var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config()
// var cookie_Session = require('')
var baseRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var sellerRouter = require('./routes/seller')
var storefrontRouter = require('./routes/storefront')
var usersRouter = require('./routes/users')
var adminRouter = require('./routes/admin')

//db config
var entryPoint = require('./config/index')

async function dbConnection() {
  try {
    await entryPoint.config.dbConnection.authenticate()
    console.log(' database connection was established succesfully ')
  } catch (err) {
    console.log('connection was not established an error occured ', err)

  }
}
dbConnection()


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', baseRouter, authRouter, sellerRouter, storefrontRouter, usersRouter, adminRouter )



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'route does not exist'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;