'use strict';

var express = require('express');
var controller = require('./order.controller');
var router = express.Router();

router.get('/', controller.index);/*for getting all order for supadmin and admin(have to make auth)*/
router.get('/user/:userId', controller.getUserOrders);/*for getting users own orders(have to make auth)*/
router.get('/admin/:adminId', controller.getAdminOrders);/*for getting admin own orders(have to make auth)*/
router.get('/order/:orderid', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;