module.exports = function (req, res) {
  res.clearCookie('SSOAuthorization')
  res.render('logout')
}
