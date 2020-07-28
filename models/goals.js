// goals model

module.exports = function (sequelize, DataTypes) {
    var Goals = sequelize.define("Goals", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    });

    Goals.associate = function(models) {
        Goals.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
        Goals.hasMany(models.Subgoals);
    };

    return Goals;
};