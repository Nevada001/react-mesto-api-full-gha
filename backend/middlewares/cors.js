const allowedCors = [
  'https://nevada.nomoredomainsrocks.ru/',
  'http://praktikum.tk',
  'localhost:3000',
];

module.exports.corsChecking = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
};
