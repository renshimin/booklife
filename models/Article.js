module.exports = function(sequelize,DataTypes){
    var Article = sequelize.define('articles',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        type_id: DataTypes.INTEGER,
        tags: DataTypes.STRING,
        status: DataTypes.INTEGER,
        read_num: DataTypes.INTEGER,
        like_num: DataTypes.INTEGER,
        comment_num: DataTypes.INTEGER,
        add_time: DataTypes.BIGINT,
        update_time: DataTypes.BIGINT
    },{
        timestamps: false,
        freezeTableName: true
    });

    return Article;
}