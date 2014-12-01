/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /todos              ->  index
 * POST    /todos              ->  create
 * GET     /todos/:id          ->  show
 * PUT     /todos/:id          ->  update
 * DELETE  /todos/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Todo = require('./todo.model');

// Get list of todos
exports.index = function (req, res) {
    Todo.find(function (err, todos) {
        if (err) { return handleError(res, err); }
        if (!todos) { return res.json(200, 'No Record found!!'); }
        
        return res.json(200, todos);
    });
};

// Get a single todo
exports.show = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) { return handleError(res, err); }
        if (!todo) { return res.json(200, 'No Record found!!'); }
        return res.json(todo);
    });
};

// Creates a new todo in the DB.
exports.create = function (req, res) {
    Todo.create(req.body, function (err, todo) {
        if (err) { return handleError(res, err); }
        return res.json(200, 'Record sucessfully created!!');
    });
};

// Updates an existing todo in the DB.
exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    Todo.findById(req.params.id, function (err, todo) {
        if (err) { return handleError(res, err); }
        if (!todo) { return res.json(200, 'No Record found!!'); }
        var updated = _.merge(todo, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, 'Record sucessfully updated!!');
        });
    });
};

// Deletes a todo from the DB.
exports.destroy = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) { return handleError(res, err); }
        if (!todo) { return res.json(200, 'No Record found!!'); }
        todo.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, 'Record sucessfully deleted!!');
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}