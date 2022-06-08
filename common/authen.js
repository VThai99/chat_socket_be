const jwt = require("jsonwebtoken");
module.exports = (roleRequire) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.send({
        status: 401,
        message: "Access Denied",
      });
    } else {
      const tokenBody = token.slice(7);
      jwt.verify(tokenBody, "THE SUPPER GOD KEY", (err, decoded) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.send({
            status: 401,
            message: "Error: Access Denied",
          });
        } else {
          if (!roleRequire) {
            next();
          } else {
            if (roleRequire === decoded.role) {
              next();
            } else {
              return res.send({
                status: 401,
                message: "Error: Access Denied",
              });
            }
          }
        }
      });
    }
  };
};