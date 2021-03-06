// const Sequelize = require('sequelize');


// const config = require('./config');


// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: config.dialect,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

// const ID_TYPE = Sequelize.INTEGER;

// function defineModel(name, attributes) {
//     var attrs = {};
//     for (let key in attributes) {
//         let value = attributes[key];
//         if (typeof value === 'object' && value['type']) {
//             value.allowNull = value.allowNull || false;
//             attrs[key] = value;
//         } else {
//             attrs[key] = {
//                 type: value,
//                 allowNull: false
//             };
//         }
//     }
//     attrs.id = {
//         type: ID_TYPE,
//         primaryKey: true
//     };
//     attrs.add_time = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };
//     attrs.update_time = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };


//     return sequelize.define(name, attrs, {
//         tableName: name,
//         timestamps: false,
//         hooks: {
//             beforeValidate: function (obj) {
//                 let now = Date.now();
//                 if (obj.isNewRecord) {
//                     obj.add_time = now;
//                 } else {
//                     obj.update_time = now;
//                 }
//             }
//         }
//     });
// }

// const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

// var exp = {
//     defineModel: defineModel,
//     sequelize: new Sequelize(config.database, config.username, config.password, {
//         host: config.host,
//         dialect: config.dialect,
//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         }
//     })
// };

// for (let type of TYPES) {
//     exp[type] = Sequelize[type];
// }

// exp.ID = ID_TYPE;

// module.exports = exp;

'use strict'

var config = require('./config');
var Sequelize = require('sequelize');
var db = {
    sequelize: new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    })
};
db.User = db.sequelize.import('./models/User.js');
db.User_Log = db.sequelize.import('./models/User_Log.js');
db.Article = db.sequelize.import('./models/Article.js');

// db.User.hasMany(db.Article,{foreignKey:'id',targetKey: 'user_id'});
db.User.hasMany(db.Article);
db.Article.belongsTo(db.User);
module.exports = db;





