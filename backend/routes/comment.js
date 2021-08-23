const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const commentCtl = require("../controllers/comment");

router.post("/comments", auth, commentCtl.createComment);
router.get("/comments", auth, commentCtl.getAllComment);
router.get("/comments/:uuid", auth, commentCtl.getOneComment);
router.delete("/comments/:uuid", auth, commentCtl.commentDelete);
router.put("/comments/:uuid", auth, commentCtl.commentUpdate);
router.post("/comments/:uuid", auth, commentCtl.modifyLike)

module.exports = router;