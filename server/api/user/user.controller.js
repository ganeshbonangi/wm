'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  
  var newUser = new User(req.body);
  newUser.provider = 'local';
  //newUser.role = 'user';
  //console.log(newUser);
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });

};
/*Change a user skills*/
exports.changeSkills = function(req, res, next) {
  var userId = req.user._id;
  var skills = String(req.body.skills);
  //var password = String(req.body.password);
  User.findById(userId, function (err, user) {
   // if(user.authenticate(password)) {

      user.skills = skills;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    //} else {
      //res.send(403);
    //}
  });
};
/*
Change User name
*/
exports.changeUserName = function(req, res, next) {
  var userId = req.user._id;
  var name = String(req.body.name);
  //var password = String(req.body.password);
  User.findById(userId, function (err, user) {
   // if(user.authenticate(password)) {

      user.name = name;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    //} else {
      //res.send(403);
    //}
  });
};

exports.updateUser = function(req, res) {

  var name = req.body.user.name;
  var gender = req.body.user.gender;
  var status = req.body.user.status;
  var mobile = req.body.user.mobile;
  var skills = req.body.user.skills;
  var loc = {};
  loc.address = req.body.user.location.address;
  loc.lat = req.body.user.location.lat;
  loc.lng = req.body.user.location.lng;

  User.findById(req.params.id, function(err, user) {
    user.name = name;
    user.gender = gender;
    user.status = status;
    user.mobile = mobile;
    user.location = loc;
    user.skills = skills;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });

};
exports.changeMobile = function(req, res, next) {
  var userId = req.user._id;
  var mobile = String(req.body.mobile);
  //var password = String(req.body.password);
  User.findById(userId, function (err, user) {
   // if(user.authenticate(password)) {

      user.mobile = mobile;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    //} else {
      //res.send(403);
    //}
  });
};

exports.changeStatus = function(req, res, next) {
  var userId = req.user._id;
  var status = String(req.body.status);
  //var password = String(req.body.password);
  User.findById(userId, function (err, user) {
   // if(user.authenticate(password)) {

      user.status = status;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    //} else {
      //res.send(403);
    //}
  });
};

exports.changeLocation = function(req, res, next) {
  var userId = req.user._id;
  var location={};
  location.lat = req.body.location.lat;
  location.lng = req.body.location.lng;
  location.address = req.body.location.address;
  User.findById(userId, function (err, user) {
   // if(user.authenticate(password)) {

      user.location = location;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    //} else {
      //res.send(403);
    //}
  });
};
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
