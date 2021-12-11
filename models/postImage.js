const Sequelize = require("sequelize");

module.exports = class PostImages extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING(8),
          defaultValue: "ACTIVE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "PostImages",
        tableName: "PostImages",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }

  static associate(db) {
    db.PostImages.belongsTo(db.Posts, { foreignKey: "postIdx", as: "post" });
  }
};
