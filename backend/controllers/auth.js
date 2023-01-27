const ErrorStatusCode = require("../errors/ErrorStatusCode");
const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const userTemplate = user.toObject();
  delete userTemplate.password;
  res.status(StatusCodes.CREATED).json({ status: true, user: userTemplate });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new ErrorStatusCode(
      StatusCodes.NOT_FOUND,
      `Not found username ${username}`
    );
  }
  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new ErrorStatusCode(StatusCodes.UNAUTHORIZED, "Incorrect password");
  }
  const userTemplate = user.toObject();
  delete userTemplate.password;
  res.status(StatusCodes.OK).json({ status: true, user: userTemplate });
};

module.exports = { register, login };
