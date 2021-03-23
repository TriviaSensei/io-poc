const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRoutes');
const coinRouter = require('./routes/coinRoutes');

const app = express();

app.set('view engine', 'pug');
//directory for views is /views
app.set('views', path.join(__dirname, 'views'));

//serving static files
//all static files (css, js, images) will be served from this folder as a result
app.use(express.static(path.join(__dirname, 'public')));

//development logging
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

//body parser, read data from body to req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

//testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});

// 2) Routes
app.use('/', viewRouter);
app.use('/api/v1/coin/', coinRouter);

// app.all('*', (req, res, next) => {
//   //any argument passed to a next() function is assumed to be an error; skips all other middleware and goes to the error handler.
//   next(new AppError(`Could not find ${req.originalUrl} on this server.`, 404));
// });

module.exports = app;
