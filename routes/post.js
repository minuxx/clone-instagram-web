const express = require("express");
const { Op } = require("sequelize/dist");
const jwtMiddleware = require("../middlewares/auth");
const { Posts, PostImages } = require("../models");
const Users = require("../models/user");
const createRes = require("../utils/common");

const router = express.Router();

router.post("/", jwtMiddleware, async (req, res, next) => {
  const userIdx = req.verifiedToken.userIdx;
  const { content, urls } = req.body;

  try {
    const exUser = await Users.findOne({ where: { idx: userIdx, state: "ACTIVE" } });
    if (!exUser) {
      return res.json(createRes(401, false, "존재하지 않는 회원입니다."));
    }

    await Posts.create({
      content,
      userIdx,
    })
      .then((post) => {
        const promises = [];

        for (let url of urls) {
          const promise = PostImages.create({
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

router.get("/", jwtMiddleware, async (req, res, next) => {
  const { filter, search } = req.query;

  try {
    let userModel = { model: Users, as: "user", attributes: ["name", "profileImgUrl"] };
    let whereOption = null;

    if (filter == "writer") {
      userModel = { model: Users, as: "user", attributes: ["name", "profileImgUrl"], where: { name: search } };
    } else if (filter == "content") {
      whereOption = { content: { [Op.substring]: search } };
    } else if (filter == "hashtag") {
      whereOption = { content: { [Op.substring]: `#${search}` } };
    }

    const posts = await Posts.findAll({
      include: [userModel, { model: PostImages, as: "imgUrls", attributes: ["idx", "url"] }],
      attributes: ["idx", "content", "location", "createdAt"],
      where: whereOption,
    });

    return res.json(createRes(200, true, "게시물 조회에 성공했습니다.", { posts }));
  } catch (error) {
    console.log(error);
    return res.json(createRes(400, false, "게시물 조회에 실패했습니다."));
  }
});

module.exports = router;
