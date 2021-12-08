const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const passport = require("passport");
const passportConfig = require("./passport");

dotenv.config();
const { sequelize } = require("./models");

const app = express();
passportConfig();
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
      maxAge: 24000 * 60 * 60,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", authRouter);
app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  }
});

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
