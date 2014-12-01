/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Updates an existing user in the DB.
exports.login = function (req, res) {
    if (req.body.username && req.body.password) {
        console.log(req.body);
        User.findOne(req.body, function (err, user) {
            console.log(user);
            if (err) { return handleError(res, err); }
            if (!user) { return res.json(200, 'Wrong username & password!!'); }
            var userLoginInfo = { email: user.email, role: user.role };
            return res.json(200, userLoginInfo);
        });
    }
    else {
        handleError(404, 'please send request with username & password!!');
    }
};

// Get list of users
exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) { return handleError(res, err); }
        return res.json(200, users);
    });
};

// Get a single user
exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        return res.json(user);
    });
};

// Creates a new user in the DB.
exports.create = function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) { return handleError(res, err); }
        return res.json(201, user);
    });
};

// Updates an existing user in the DB.
exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        var updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, user);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        user.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}