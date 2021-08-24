const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth")
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user/:uuid", auth, userCtrl.getUserInfos);
router.delete("/user/:uuid", auth, userCtrl.userDelete);
router.put("/user/:uuid", auth, userCtrl.userUpdate);


module.exports = router;