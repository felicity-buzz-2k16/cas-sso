var jwt = require('jsonwebtoken')
var models = require('./models')
var config = require('./config')

module.exports = function (req, res, next) {
  var { name, token } = req.body
  var { email } = jwt.verify(token, config.secret)
  models.names.put(email, name)
  req.user = { email, name}
  next()
}
