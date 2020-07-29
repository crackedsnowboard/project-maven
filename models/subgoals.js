// subgoals model

module.exports = function (sequelize, DataTypes) {
    var Subgoals = sequelize.define("Subgoals", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: true,
            // }
        }
    });

    Subgoals.associate = function(models) {
        Subgoals.belongsTo(models.Goals, {
            foreignKey: {
                allowNull: false
            }
        });
        Subgoals.hasMany(models.Tasks);
    };

    return Subgoals;
};