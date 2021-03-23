const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 3) render template using tour data from (1)
  // this will look in the /views (set in app.js) folder for 'overview.pug' (pug engine also specified in app.js)
  res.status(200).render('index', {
    title: `Flip a coin`,
  });
});

exports.getRed = catchAsync(async (req, res, next) => {
  // 3) render template using tour data from (1)
  // this will look in the /views (set in app.js) folder for 'overview.pug' (pug engine also specified in app.js)
  res.status(200).render('red', {
    title: `Flip a coin`,
  });
});
