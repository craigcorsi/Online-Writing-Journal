module.exports = function (sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        book_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Book.associate = function (models) {
        // We're saying that a Book should belong to a User
        // A Book can't be created without a User due to the foreign key constraint
        Book.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Book.hasMany(models.Chapter, {
            onDelete: "cascade"
        });
    };

    return Book;
};
