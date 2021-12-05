const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { email, name, id, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      id,
      password: hash,
    });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
