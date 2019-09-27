const User = require('../models/User');

module.exports = function(sequelize,DataTypes){
    var Article = sequelize.define('articles',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        type_id: DataTypes.INTEGER,
        is_release: DataTypes.INTEGER,
        is_del:DataTypes.INTEGER,
        read_num: DataTypes.INTEGER,
        like_num: DataTypes.INTEGER,
        comment_num: DataTypes.INTEGER,
        add_time: DataTypes.DATE,
        update_time: DataTypes.DATE
    },{
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });

    return Article;
}