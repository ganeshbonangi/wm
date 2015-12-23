'use strict';

var express = require('express');
var controller = require('./mailer.controller');
var config = require('../../config/environment');

var router = express.Router();
router.post('/', controller.sendMail);
module.exports = router;
