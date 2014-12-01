/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `todoDB: false`
 */

'use strict';

var User = require('../api/user/user.model');


User.find({}).remove(function () {
    User.create(
        {
            username: 'admin',
            password: 'admin@123',
            email: 'admin@todoapp.com',
            role: 1
        }
    );
    console.log('Admin Created!!');
});