'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, Required: true },
    password: { type: String, Required: true },
    email: { type: String, default: '' },
    role: { type: Number, default: 1 },//1 For guest, 2 For User,3 for Admin,4 for Super Admin
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);