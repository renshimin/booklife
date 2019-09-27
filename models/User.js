module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nickname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        mobile: DataTypes.STRING,
        avatar: DataTypes.STRING,
        profile: DataTypes.STRING,
        sex: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        add_time: DataTypes.DATE,
        update_time: DataTypes.DATE
    },{
        timestamps: false,
        freezeTableName: true,
        underscored: true
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