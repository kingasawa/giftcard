/**
 * User.js
 * @Owner       :: Khanh Tran
 * @description :: Thông tin về User.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var md5 = require('md5');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    groupid: {
      model: 'usergroup'
    },
    name: {
      type: 'string',
      required: true
    },
    birthday: {
      type: 'string'
    },
    avatar: {
      type: 'string',
      defaultsTo: 'no-avatar.png'
    },
    point: {
      type: 'integer',
      defaultsTo:10
    },
    own: {
      type: 'array'
    },
    balance: {
      type: 'float',
      defaultsTo: 0
    },
    products: {
      collection: 'product',
      via: 'owner'
    }

  },
  // Check Login
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      password = md5(password);
      sails.log('Thông tin đăng nhập {email, password}', {email, password});
      User.findOne({email, password}).exec(function (err, res) {
        sails.log('user data', res);
        if (err)
          reject(err);
        if (typeof res == 'undefined'){
          reject("đăng nhập thất bại");
        }
        resolve(res);
      })
    })
  },
  beforeCreate: function (attrs, cb) {
    attrs.password = md5(attrs.password);
    return cb();
  }
};

