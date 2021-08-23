const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userUuid = decodedToken.userUuid;
    if (req.body.userUuid && req.body.userUuid !== userUuid) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
        res.status(401).json({error: error | "Requête non authentifiée !" });
    }
  };