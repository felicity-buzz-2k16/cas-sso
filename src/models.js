var level = require('level')

module.exports = {
  names: level('./names'),
  banned: level('./banned')
}
