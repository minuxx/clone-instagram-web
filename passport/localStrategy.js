const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const createRes = require("../utils/common");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const exUser = await User.findOne({ where: { id } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(
                null,
                false,
                createRes(401, false, "비밀번호가 일치하지 않습니다."),
              );
            }
          } else {
            done(
              null,
              false,
              createRes(402, false, "존재하지 않는 회원입니다."),
            );
          }
        } catch (error) {
          done(error, false, createRes(400, false, "회원가입에 실패했습니다."));
        }
      },
    ),
  );
};
