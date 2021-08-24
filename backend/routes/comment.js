const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtl = require("../controllers/comment");

router.post("/comments", auth, commentCtl.createComment);
router.get("/comments", auth, commentCtl.getAllComment);
router.delete("/comments/:uuid", auth, commentCtl.commentDelete);
router.post("/comments/:uuid", auth, commentCtl.modifyLike)

module.exports = router;