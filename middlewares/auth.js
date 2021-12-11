const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;

  // token does not exist
  if (!token) {
    return res.json(createRes(401, false, "JWT 토큰이 존재하지 않습니다."));
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });

  // process the promise
  p.then((verifiedToken) => {
    req.verifiedToken = verifiedToken;
    next();
  }).catch((err) => {
    console.error(err);
    return res.json(createRes(402, false, "JWT 토큰이 유효하지 않습니다."));
  });
};

module.exports = jwtMiddleware;
