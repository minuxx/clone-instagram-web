const express = require("express");
const jwtMiddleware = require("../middlewares/auth");
const { Post, PostImage } = require("../models");
const User = require("../models/user");
const createRes = require("../utils/common");

const router = express.Router();

router.post("/", jwtMiddleware, async (req, res, next) => {
  const userIdx = req.verifiedToken.userIdx;
  const { content, urls } = req.body;

  try {
    const exUser = await User.findOne({ where: { idx: userIdx, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    await Post.create({
      content,
      userIdx,
    })
      .then((post) => {
        const promises = [];

        for (let url of urls) {
          const promise = PostImage.create({
            postIdx: post.idx,
            url,
          });
          promises.push(promise);
        }

        Promise.all(promises);
      })
      .then(() => {
        return res.json(createRes(200, true, "게시물 등록에 성공했습니다."));
      })
      .catch((error) => {
        console.log(error);
        return res.json(createRes(400, false, "게시물 등록에 실패했습니다."));
      });
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "게시물 등록에 실패했습니다."));
  }
});

router.get("/", async (req, res, next) => {
  try {
    await Post.findAll({
      include: [{ model: PostImage, as: "urls", attributes: ["url"], where: { state: "ACTIVE" } }],
      content,
      userIdx,
    });
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "게시물 등록에 실패했습니다."));
  }
});

module.exports = router;
