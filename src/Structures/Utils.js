const { promisify } = require('util');
const glob = require('glob');

module.exports = {
  getRandomString: length => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  },
  search: promisify(glob),
  sleep: promisify(setTimeout),
  pretty: str => str[0].toUpperCase() + str.slice(1).toLowerCase()
};
