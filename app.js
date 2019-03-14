// require dependencies
let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    twittiment = require('./routes/index'),
    http = require('http');
   

// initialize express
let app = express();

// setup handlebars and set port
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('PORT', process.env.PORT || 3000);

// setup logging
app.use(logger('dev'));

// setup middleware for express and serve-favicon 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// setup routing
app.use('/', twittiment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handling -- express-generator out of box code
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start the server
http.createServer(app).listen(app.get('PORT'), function(){
  console.log(`Server listening on port ${app.get('PORT')}`);
});


module.exports = app;
