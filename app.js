let express = require('express');
let ROUTER = express.Router();
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let errorHandler = require('./helpers/errorHandler');
let consign = require('consign');
let app = express();

require('./config/mensagensMongoose');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


consign({
  cwd : __dirname,
  extensions : ['.js']
})
  .include('routes')
  .into(ROUTER);

app.use('/api/v1', ROUTER);


consign({
  extensions : ['.js']
})
  .include('config')
  .into(app);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  errorHandler(res, err)
});

module.exports = app;
