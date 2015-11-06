'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/name', auth.isAuthenticated(), controller.changeUserName);
router.put('/:id/mobile', auth.isAuthenticated(), controller.changeMobile);
router.put('/:id/status', auth.isAuthenticated(), controller.changeStatus);
router.put('/:id/location', auth.isAuthenticated(), controller.changeLocation);
router.put('/:id/skills', auth.isAuthenticated(), controller.changeSkills);
router.put('/:id/update', auth.isAuthenticated(), controller.updateUser);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
module.exports = router;
