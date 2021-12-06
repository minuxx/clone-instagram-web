const express = require("express");
const bcrypt = require("bcrypt");
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

module.exports = router;
