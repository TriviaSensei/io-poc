exports.flipCoin = (req, res, next) => {
  const a = Math.random();
  let result;
  if (a < 0.5) result = 'heads';
  else result = 'tails';

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
};
