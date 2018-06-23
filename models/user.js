module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the User model a name of type STRING
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    User.associate = function (models) {
        // Associating User with Books
        // When an User is deleted, also delete any associated Books
        User.hasMany(models.Book, {
            onDelete: "cascade"
        });
    };

    return User;
};
