const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginModel = require("../Models/LoginModel");

const check = async (req, res) => {

  return res.status(200).json({ status: "success" });

}

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usernamecheck = await LoginModel.find({ username: username });

    if (usernamecheck.length == 0) {
      return res
        .status(200)
        .json({ status: "error", message: "Invalid User Name" });
    }

    const passwordstatus = await bcrypt.compare(
      password,
      usernamecheck[0].password
    );

    if (!passwordstatus) {
      return res
        .status(200)
        .json({ status: "error", message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      {
        id: usernamecheck[0]._id,
        username: username,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    res.status(200).json({ status: "success", token: accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const saltRounds = 10; // The number of rounds to generate the salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await LoginModel.create({ username: username, password: hashedPassword });

    return res.status(200).json({ message: "Successfully Account Created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { check, login, createLogin };
