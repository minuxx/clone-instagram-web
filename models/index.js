const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Users = require("./user");
const Posts = require("./post");
const PostImages = require("./postImage");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Users = Users;
db.Posts = Posts;
db.PostImages = PostImages;

Users.init(sequelize);
Posts.init(sequelize);
PostImages.init(sequelize);

Users.associate(db);
Posts.associate(db);
PostImages.associate(db);

module.exports = db;
