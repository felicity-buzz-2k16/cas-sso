var passport = require('passport')
var { names, banned } = require('./models')

passport.use(new (require('passport-cas').Strategy)({
  ssoBaseURL: 'https://login.iiit.ac.in/cas',
  serverBaseURL: 'http://localhost',
  serviceURL: '/auth/login',
}, function(email, done) {
  banned.get(email, (err, isBanned) => {
    if (err && !err.notFound) return done(err);
    if (isBanned) return done(null, false, 'Banned');
    names.get(email, (err, name) => {
      if (err && !err.notFound) return done(err);
      if (err && err.notFound) return done(null, { email }, {newUser: true})
      done(null, { email, name })
    })
  })
}));
