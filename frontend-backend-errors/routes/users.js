var express = require('express');
var router = express.Router();
var passport = require('passport')

var userController = require('../controllers/userController');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const { userAuthMiddleware } = require('../utils/authServices');

/* GET users listing. */

router.post('/register-login', function(req, res, next) {


  userController.registerHamster(req.body)
    .then(user => res.json(user))
    .catch(err => {
      res.status(err.status).json({
        confirmation: false,
        payload: err
      })
    })

})


router.post('/register', function(req, res, next) {


  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
    //return res.status(400).json(errors);
  }

  userController.register(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

router.post('/login', function(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userController.login(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);


module.exports = router;
