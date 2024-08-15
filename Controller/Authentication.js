const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(200).json({ message: "tokenformateinvalid" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(200).json({ message: "timeexpired" });
        req.user = user;
        next();
      });
};

module.exports = { authentication };