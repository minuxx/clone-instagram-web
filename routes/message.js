const express = require("express");
const { Op } = require("sequelize/dist");
const jwtMiddleware = require("../middlewares/auth");
const Users = require("../models/user");
const Messages = require("../models/message");
const createRes = require("../utils/common");

const router = express.Router();

router.get("/:id", jwtMiddleware, async (req, res) => {
  const userIdx = req.verifiedToken.userIdx;
  const id = req.params.id;
  console.log(id);

  try {
    const exUser = await Users.findOne({ where: { id, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    const messages = await Messages.findAll({
      attributes: ["idx", "senderName", "content"],
      where: {
        [Op.or]: [
          { [Op.and]: [{ senderIdx: userIdx }, { receiverIdx: exUser.idx }] },
          { [Op.and]: [{ senderIdx: exUser.idx }, { receiverIdx: userIdx }] },
        ],
      },
    });

    return res.json(createRes(200, true, "메세지 조회에 성공했습니다.", { messages }));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "메세지 조회에 실패했습니다."));
  }
});

router.post("/", jwtMiddleware, async (req, res) => {
  const userIdx = req.verifiedToken.userIdx;
  const { receiverId, content } = req.body;

  try {
    const receiver = await Users.findOne({ attributes: ["idx"], where: { id: receiverId, state: "ACTIVE" } });
    const sender = await Users.findOne({ attributes: ["name"], where: { idx: userIdx, state: "ACTIVE" } });
    if (!receiver || !sender) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    await Messages.create({
      senderIdx: userIdx,
      receiverIdx: receiver.idx,
      senderName: sender.name,
      content,
    });

    return res.json(createRes(200, true, "메세지 보내기에 성공했습니다."));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "메세지 보내기에 실패했습니다."));
  }
});

module.exports = router;
