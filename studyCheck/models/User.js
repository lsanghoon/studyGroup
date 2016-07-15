var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('saving', this.hashPassword, this);
  },

  hashPassword: function(model, attrs, options) {
    var uName = options.patch ? attrs.uName : model.get('uName');
    if (!uName) { return; }
    return new Promise(function(resolve, reject) {
      model.set('uName', uName);
      resolve();
    });
  },

  comparePassword: function(uName, done) {
    console.log("User.js comparePassword 입장");
    var model = this;
    bcrypt.compare(uName, model.get('uName'), function(err, isMatch) {
      done(err, isMatch);
    });
  }

});

module.exports = User;
