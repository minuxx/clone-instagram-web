const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const cors = require("cors");

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

app.use(morgan("dev"));
const client = path.join(__dirname, "client/build");
console.log(client);
app.use(express.static(client));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use("/users", authRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

function corsCheck(req, callback) {
  let corsOptions;
  const acceptList = ["https://web.expertly.info:8032"];
  if (acceptList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credential: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}
