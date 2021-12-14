const Sequelize = require("sequelize");

module.exports = class Messages extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        senderName: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        senderIdx: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        receiverIdx: {
          type: Sequelize.INTEGER,
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
        modelName: "Messages",
        tableName: "Messages",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {}
};
