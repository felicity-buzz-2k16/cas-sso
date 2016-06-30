var jwt = require('jsonwebtoken')

var config = require('./config')

module.exports = function (req, res) {
  const { email, name } = req.user;
  const token = jwt.sign({email, name}, config.secret);
  res.cookie('SSOAuthorization', token, { httpOnly: true })
  res.render('final_auth', {
    email,
    name,
    token
  })
}
