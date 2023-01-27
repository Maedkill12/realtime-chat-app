const User = require("../model/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.json({ status: true, user });
};

module.exports = { register };
