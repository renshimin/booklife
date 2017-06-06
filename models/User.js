const db = require('../db');

var User = db.defineModel('users', {
    nickname: db.STRING(50),
    email: db.STRING(50),
    password: db.STRING(50),
    mobile: db.STRING(20),
});


module.exports = {
    getUser: () => {
        var users = User.findAll();
        return users;
    }
}