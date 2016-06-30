/*eslint-env browser */

(function (window) {
  var absurl = window.location.origin + '/auth/'

  function login() {
    window.open(absurl + 'login')
  }

  function logout() {
    window.open(absurl + 'logout')
  }

  window.addEventListener('storage', function(e) {
    if (e.key == 'SSO-Authorization') {
      auth.token = e.newValue;
      auth.isLoggedIn = !!auth.token
      if (auth.isLoggedIn) auth.onLogin();
      else auth.onLogout()
    } else if (e.key == 'SSO-Name') {
      auth.name = e.newValue
    } else if (e.key == 'SSO-Email') {
      auth.email = e.newValue
    }
  })

  function onLogin() {
    console.log('Logged in')
  }

  function onLogout() {
    console.log('Logged out')
  }

  var auth = {
    login: login,
    logout: logout,
    token: window.localStorage.getItem('SSO-Authorization'),
    name: window.localStorage.getItem('SSO-Name'),
    email: window.localStorage.getItem('SSO-Email'),
    isLoggedIn: !!this.token,
    onLogin: onLogin,
    onLogout: onLogout
  }

  auth.isLoggedIn = !!auth.token;

  window.auth = auth
  return auth;
})(window)
