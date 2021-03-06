module.exports = function(sequelize,DataTypes){
    var User_Log = sequelize.define('user_logs',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: DataTypes.INTEGER,
        ip: DataTypes.STRING,
        add_time: DataTypes.DATE
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User_Log;
}