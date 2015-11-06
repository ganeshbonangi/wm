/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /orders              ->  index
 * POST    /orders              ->  create
 * GET     /orders/:id          ->  show
 * PUT     /orders/:id          ->  update
 * DELETE  /orders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');

// Get list of orders
exports.index = function(req, res) {
  Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  });
};

//Get user specipic orders
exports.getUserOrders = function(req, res){
  Order.find({'placed':req.params.userId},function(err,orders){
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  })
};

//Get admin orders
exports.getAdminOrders = function(req, res){
  Order.find({'handledby':req.params.adminId},function(err,orders){
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  })
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
  Order.create(req.body, function(err, order) {
    if(err) { return handleError(res, err); }
    return res.json(201, order);
  });
};

// Updates an existing order in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    var updated = _.merge(order, req.body);
    console.log(JSON.parse(req.body.location));
    var loc = JSON.parse(req.body.location);
    /*loc.address = req.body.location.address;
    loc.lat = req.body.location.lat;
    loc.lng = req.body.location.lng;*/
    updated.location = loc
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}