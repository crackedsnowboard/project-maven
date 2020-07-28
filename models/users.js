// users model

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        // password might be implemented later
    });

    Users.associate = function(models) {
        Users.hasMany(models.Goals)
    }
    return Users;
};