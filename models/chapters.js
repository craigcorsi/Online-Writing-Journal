module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define("Chapter", {
        chapter_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        chapter_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Chapter.associate = function (models) {
        // We're saying that a Chapter should belong to a Book
        // A Chapter can't be created without a Book due to the foreign key constraint
        Chapter.belongsTo(models.Book, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Chapter;
};
