'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var config = require('./../../config/environment');

var connection = mongoose.createConnection(config.mongo.uri);

autoIncrement.initialize(connection);

var TodoSchema = new Schema({
    id:Number,
    todoTitle: String,
    todoDescription: String,
  sDate: Date,
  eDate:Date
});
TodoSchema.plugin(autoIncrement.plugin, 'Todo');
module.exports = mongoose.model('Todo', TodoSchema);