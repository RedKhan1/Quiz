var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const { userAuthMiddleware } = require('../utils/authServices');

/* GET users listing. */
router.post('/register', function(req, res, next) {


  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
    //return res.status(400).json(errors);
  }

  adminController.register(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

router.post('/login', function(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  adminController.login(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

router.get(
  '/current', userAuthMiddleware,
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);


module.exports = router;
