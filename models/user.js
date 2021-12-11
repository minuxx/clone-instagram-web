const Sequelize = require("sequelize");

module.exports = class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        id: {
          type: Sequelize.STRING(75),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        profileImgUrl: {
          type: Sequelize.STRING(200),
          allowNull: true,
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
        modelName: "Users",
        tableName: "Users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    db.Users.hasMany(db.Posts, { foreignKey: "postIdx", as: "user" });
    db.Users.belongsToMany(db.Users, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.Users.belongsToMany(db.Users, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
};
