const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require("../models/User");
const Admin = require("../models/Admin");
//const keys = require('../config/keys');
const keys = 'hamstergang' || process.env.SECRET_KEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;
//console.log(process.env.SECRET_KEY)
//opts.secretOrKey = keys.secretOrKey;



module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};



///////
/*

Check both user and admin

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require("../models/User");
const Admin = require("../models/Admin");
//const keys = require('../config/keys');
const keys = 'hamstergang' || process.env.SECRET_KEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;
//console.log(process.env.SECRET_KEY)
//opts.secretOrKey = keys.secretOrKey;


function findUser (id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
    .then(user => {
      if (user) {
        resolve(user);
      } else {
        resolve(false)
      }
    })
    .catch(err => console.log(err));
  })
}

function findAdmin(id) {
  return new Promise((resolve, reject) => {
    Admin.findById(id)
    .then(user => {
      if (user) {
        resolve(user);
      } else {
        resolve(false)
      }
      
    })
    .catch(err => console.log(err));
  })
}

const userJWTAuth = new JwtStrategy(opts, (jwt_payload, done) => {

  const findUserPromise = findUser(jwt_payload.id);
  const findAdminPromise = findAdmin(jwt_payload.id)

  Promise.all([findUserPromise, findAdminPromise])
    .then(function(result) {
      result = result.filter( user => user !== false);

      const user = result[0];
      if (user) {
        return done(null, user);
      }
      return done(null, false);

    })
    .catch(function(err) {
      return err
    })
    

 
})

passport.use(userJWTAuth);

const authUserJwt = passport.authenticate('jwt', {session: false });

module.exports = authUserJwt;



*/