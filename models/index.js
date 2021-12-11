const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Post = require("./post");
const PostImage = require("./postImage");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.PostImage = PostImage;

User.init(sequelize);
Post.init(sequelize);
PostImage.init(sequelize);

User.associate(db);
Post.associate(db);
PostImage.associate(db);

module.exports = db;
