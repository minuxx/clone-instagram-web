const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Users = require("./user");
const Posts = require("./post");
const PostImages = require("./postImage");
const Messages = require("./message");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Users = Users;
db.Posts = Posts;
db.PostImages = PostImages;
db.Messages = Messages;

Users.init(sequelize);
Posts.init(sequelize);
PostImages.init(sequelize);
Messages.init(sequelize);

Users.associate(db);
Posts.associate(db);
PostImages.associate(db);
Messages.associate(db);

module.exports = db;
