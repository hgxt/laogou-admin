  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
// -------------------------------
  var cors = require('cors');
  var cookieSession = require('cookie-session');

  var app = express();
  
  //用户路由
  const userRouter =require('./routes/users');
  //职位路由
  const positionRouter = require('./routes/positions')

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // app.use(cors());
  
  //设置cookie-ssion
  // app.use(cookieSession({
  //   name:'session',
  //   keys:['key1','key2']
  // }))

  //用户
  app.use('/api/users',userRouter );

  //职位
  app.use('/api/positions',positionRouter)


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
