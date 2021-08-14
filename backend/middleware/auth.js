const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    console.log(token)
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    console.log(decodedToken)
    const userUuid = decodedToken.userUuid;
    console.log(userUuid)
    if (req.body.userUuid && req.body.userUuid !== userUuid) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
        res.status(401).json({error: error | "Requête non authentifiée !" });
    }
  };