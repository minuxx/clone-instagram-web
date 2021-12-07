const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const createRes = require("../utils/common");
const { validateEmail } = require("../middlewares/validation");

const router = express.Router();

router.post("/join", validateEmail, async (req, res, next) => {
  const { email, name, id, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      return res.json(createRes(401, false, "이미 존재하는 회원입니다."));
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      id,
      password: hash,
    });

    return res.json(createRes(200, true, "회원가입에 성공했습니다."));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "회원가입에 실패했습니다."));
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError || !user) {
      console.error(authError);
      return res.json(info);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return res.json(createRes(400, false, "로그인에 실패했습니다."));
      }

      return res.json(createRes(200, true, "로그인에 성공했습니다."));
    });
  })(req, res, next);
});

module.exports = router;
