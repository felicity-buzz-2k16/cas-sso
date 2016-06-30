var passport = require('passport')
var jwt = require('jsonwebtoken')

var config = require('./config')

module.exports = function(req, res, next) {
  passport.authenticate('cas', function (err, user, info) {
    if (err) return next(err);

    if (!user) return res.status(403).send(info)

    if (!user.name) return res.render('new_account', {
      token: jwt.sign({email: user.email}, config.secret)
    })

    req.user = user
    next();
  })(req, res, next);
};
