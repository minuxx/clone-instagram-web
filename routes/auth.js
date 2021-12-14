const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const createRes = require("../utils/common");
const { validateEmail } = require("../middlewares/validation");
const { Op } = require("sequelize/dist");
const jwtMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", validateEmail, async (req, res, next) => {
  const { email, name, id, password } = req.body;

  try {
    const exUser = await Users.findOne({ where: { [Op.or]: [{ id }, { email }] } });
    if (exUser) {
      return res.json(createRes(401, false, "이미 존재하는 회원입니다."));
    }

    const hash = await bcrypt.hash(password, 12);

    await Users.create({
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

router.get("/", jwtMiddleware, async (req, res) => {
  const userIdx = req.verifiedToken.userIdx;

  try {
    const exUser = await Users.findOne({ where: { idx: userIdx, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    const followers = await exUser.getFollowers();
    const followings = await exUser.getFollowings();

    return res.json(
      createRes(200, true, "프로필조회에 성공했습니다.", {
        user: {
          id: exUser.id,
          name: exUser.name,
          profileImgUrl: exUser.profileImgUrl,
          followers: followers.length,
          followings: followings.length,
        },
      }),
    );
  } catch (error) {
    return res.json(createRes(400, false, "프로필조회에 실패했습니다."));
  }
});

router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    const exUser = await Users.findOne({ where: { id, state: "ACTIVE" } });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        let token = jwt.sign(
          {
            userIdx: exUser.idx,
          },
          process.env.JWT_SECRET, // 비밀키
          {
            expiresIn: "365d",
            subject: "userInfo",
          }, // 유효 기간 365일
        );

        return res.json(createRes(200, true, "로그인에 성공했습니다.", { jwt: token }));
      } else {
        return res.json(createRes(401, false, "비밀번호가 일치하지 않습니다."));
      }
    } else {
      return res.json(createRes(402, false, "존재하지 않는 회원입니다."));
    }
  } catch (error) {
    return res.json(createRes(400, false, "로그인에 실패했습니다."));
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
