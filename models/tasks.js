// tasks model

module.exports = function (sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        startTime: DataTypes.STRING,
        stopTime: DataTypes.STRING,
        comments: DataTypes.STRING
    });

    Tasks.associate = function(models) {
        Tasks.belongsTo(models.Subgoals, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Tasks;
};