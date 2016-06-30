var express = require('express');
var app = express();
var passport = require('passport')

require('./passport_setup')


// Necessary middleware
app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.set('view engine', 'ejs');

app.get('/login', require('./cas_login'), require('./final_auth'))
app.post('/new_account', require('./new_account'), require('./final_auth'))
app.get('/logout', require('./logout'))
app.get('/nginx_auth', require('./nginx_auth'))

app.get('/helper.js', (req, res) => res.sendFile(__dirname + '/frontend-helper.js'))
app.get('/', (req, res) => res.send('Hello world'))

app.listen(process.env.PORT || 3000)
