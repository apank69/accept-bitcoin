// Generated by CoffeeScript 1.8.0
(function() {
  var Key, Main, Transaction, bitcore, crypt, ee, extend, fs, http,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  http = require('http');

  bitcore = require('bitcore');

  Key = require('./key');

  Transaction = require('./transaction');

  Key = require('./key');

  fs = require('fs');

  crypt = require('./encrypt');

  ee = require('events').EventEmitter;

  Main = (function() {
    var settings;

    settings = {
      network: 'test',
      password: 'enter_your_password_here',
      storePath: './keys.txt',
      encryptPrivateKey: false,
      payToAddress: 'PUT_YOUR_ADDRESS_HERE',
      payReminderToAddress: null,
      includeUnconfirmed: false,
      checkTransactionEvery: 1000 * 60 * 2,
      checkBalanceTimeout: 1000 * 60 * 60 * 2,
      checkUnspentTimeout: 1000 * 60 * 60 * 2,
      minimumConfirmations: 1,
      txFee: 0.0001
    };

    function Main(address, o) {
      if (o == null) {
        o = {};
      }
      this.decrypt = __bind(this.decrypt, this);
      this.encrypt = __bind(this.encrypt, this);
      this.generateAddress = __bind(this.generateAddress, this);
      if (!address) {
        return 'must have address';
      }
      ee.call(this);
      console.log('hello ' + address);
      this.settings = extend(settings, o);
    }

    Main.prototype.generateAddress = function(o, privateKey) {
      var key;
      if (privateKey) {
        key = new Key(settings, o, privateKey);
      } else {
        key = new Key(extend(settings, o));
      }
      if (o && o.alertWhenHasBalance) {
        key.checkBalance();
      }
      return key;
    };

    Main.prototype.encrypt = function(s) {
      return crypt.encrypt(s, this.settings.password);
    };

    Main.prototype.decrypt = function(s) {
      return crypt.decrypt(s, this.settings.password);
    };

    return Main;

  })();

  extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };

  Main.prototype.__proto__ = ee.prototype;

  module.exports = Main;

}).call(this);