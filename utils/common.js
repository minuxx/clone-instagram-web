function createRes(code, isSuccess, message, result) {
  if (result == null || result == undefined) {
    return { code, isSuccess, message };
  } else {
    return { code, isSuccess, message, result };
  }
}

module.exports = createRes;
