const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

router.post("/login", async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        let token = await jwt.sign(
          {
            userIdx: exUser.idx,
          },
          process.env.JWT_SECRET, // 비밀키
          {
            expiresIn: "365d",
            subject: "userInfo",
          }, // 유효 기간 365일
        );

        return res.json(
          createRes(200, true, "로그인에 성공했습니다.", { jwt: token }),
        );
      } else {
        return res.json(createRes(401, false, "비밀번호가 일치하지 않습니다."));
      }
    } else {
      return res.json(createRes(402, false, "존재하지 않는 회원입니다."));
    }
  } catch (error) {
    return res.json(createRes(400, false, "회원가입에 실패했습니다."));
  }
});

module.exports = router;

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (authError, user, info) => {
//     if (authError || !user) {
//       console.error(authError);
//       return res.json(info);
//     }

//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return res.json(createRes(400, false, "로그인에 실패했습니다."));
//       }

//       return res.json(createRes(200, true, "로그인에 성공했습니다."));
//     });
//   })(req, res, next);
// });
