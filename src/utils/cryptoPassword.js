const crypto = require("crypto");

function cryptoPassword(password) {
  const md5 = crypto.createHash("md5");
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}

module.exports = cryptoPassword;
