const express = require("express");
const { Op } = require("sequelize/dist");
const jwtMiddleware = require("../middlewares/auth");
const Users = require("../models/user");
const createRes = require("../utils/common");

const router = express.Router();

router.get("/", jwtMiddleware, async (req, res, next) => {
  const userIdx = req.verifiedToken.userIdx;

  try {
    const exUser = await Users.findOne({ where: { idx: userIdx, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    const users = await Users.findAll({
      include: [
        {
          model: Users,
          as: "Followers",
          attributes: ["name"],
          through: { where: { followerId: userIdx }, attributes: [] },
        },
      ],
      attributes: ["id", "name", "profileImgUrl"],
      where: { idx: { [Op.ne]: userIdx } },
    });

    return res.json(createRes(200, true, "팔로우 조회에 성공했습니다.", { users }));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "팔로우 조회에 실패했습니다."));
  }
});

router.get("/:name", jwtMiddleware, async (req, res, next) => {
  const name = req.params.name;

  try {
    const exUser = await Users.findOne({ where: { name, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    const followers = await exUser.getFollowers({ attributes: ["id", "name", "profileImgUrl"] });

    return res.json(createRes(200, true, "팔로워 조회에 성공했습니다.", { followers }));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "팔로워 조회에 실패했습니다."));
  }
});

router.post("/", jwtMiddleware, async (req, res) => {
  const userIdx = req.verifiedToken.userIdx;
  const id = req.body.id;

  try {
    const exUser = await Users.findOne({ where: { id, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    await exUser.addFollowers(userIdx);

    return res.json(createRes(200, true, "팔로잉에 성공했습니다."));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "팔로잉에 실패했습니다."));
  }
});

router.delete("/:id", jwtMiddleware, async (req, res) => {
  const userIdx = req.verifiedToken.userIdx;
  const id = req.params.id;

  try {
    const exUser = await Users.findOne({ where: { id, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    await exUser.removeFollowers(userIdx);

    return res.json(createRes(200, true, "팔로잉 취소에 성공했습니다."));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "팔로잉 취소에 실패했습니다."));
  }
});

module.exports = router;
