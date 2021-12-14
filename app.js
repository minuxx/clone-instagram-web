const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const followRouter = require("./routes/follow");
const messageRouter = require("./routes/message");

dotenv.config();
const { sequelize } = require("./models");

const app = express();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.set("port", process.env.PORT || 8032);

app.use(cors());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/users", authRouter);
app.use("/posts", postRouter);
app.use("/follows", followRouter);
app.use("/messages", messageRouter);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
