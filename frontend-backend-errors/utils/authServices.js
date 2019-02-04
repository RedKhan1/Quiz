const authUserJwt = require('./userPassport');

const userAuthMiddleware = (req, res, next) => {
  return authUserJwt(req, res, next);
}

module.exports = {
  userAuthMiddleware
}