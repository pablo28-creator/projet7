const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const commentCtl = require("../controllers/comment");

router.post("/comments", multer, commentCtl.createComment);
router.get("/comments", multer, commentCtl.getAllComment);
router.get("/comments/:uuid", multer, commentCtl.getOneComment);
router.delete("/comments/:uuid", multer, commentCtl.commentDelete);
router.put("/comments/:uuid", multer, commentCtl.commentUpdate);
router.post("/comments/:uuid",  commentCtl.modifyLike)

module.exports = router;