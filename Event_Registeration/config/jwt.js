require('dotenv').config();

module.exports = {
  secret: process.env.secret_key || 'fallback_secret_key_change_me',
  expiresIn: '1d'
};