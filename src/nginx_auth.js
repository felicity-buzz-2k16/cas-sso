var jwt = require('jsonwebtoken')

var config = require('./config')

module.exports = function (req, res) {
  const token = req.get('SSO-Authorization') || req.cookies.SSOAuthorization
  jwt.verify(token, config.secret, function (err, decoded) {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", 0);
    if (err) return res.send()
    const { email, name } = decoded || {}
    res.set('email', email)
    res.set('name', name)
    res.send()
  })
}
