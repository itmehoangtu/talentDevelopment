var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var User = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        User = sequelize.define('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            password: Sequelize.STRING,
            email: Sequelize.STRING
        });
        User.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
 
module.exports.findById = function(id, callback) {
    User.find({ where: { id: id} }).then(function(user) {
        if(!user) {
            callback('User ' + id + ' does not exist');
        } else {
            callback(null, {
                id: user.id,
                username: user.username,
                password: user.password,
                email: user.email
            });
        }
    });
}
 
module.exports.findByUsername = function(username, callback) {
    User.find({where: {username: username}}).then(function(user) {
        if(!user) {
            callback('user ' + username + ' does not exist');
        } else {
            callback(null, {
                id: user.id,
                username: user.username,
                password: user.password,
                email: user.email
           });
        } 
    });
}
 
module.exports.create = function(id, username, password, email, callback) {
    User.create({
        id: id,
        username: username,
        password: password,
        email: email
    }).then(function(user) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
 
module.exports.update = function(id, username, password, email, callback) {
    User.find({where: {id: id}}).then(function(user) {
        user.updateAttributes({
            id: id,
            username: username,
            password: password,
            email: email
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}