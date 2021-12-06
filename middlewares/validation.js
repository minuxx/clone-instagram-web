const createRes = require("../utils/common");

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  let isValidated = true;

  if (
    email.length == 0 &&
    !email.match("/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/")
  ) {
    isValidated = false;
  }

  if (!isValidated) {
    return res.json(createRes(402, false, "이메일형식이 올바르지 않습니다."));
  }

  next();
};

module.exports = { validateEmail };
