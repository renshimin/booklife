module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER
        },
        last_time: {
            type: DataTypes.BIGINT
        },
        add_time: {
            type: DataTypes.BIGINT
        },
        update_time: {
            type: DataTypes.BIGINT
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User;
}

// module.exports = {
//     getUser: (id) => {
//         var users = User.findAll({
//             where: {
//                 id: id
//             } 
//         });
//         return users;
//     },
//     add: (model) => {
//         return User.create(model);
//     }
// }