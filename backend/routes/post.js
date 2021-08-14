const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const postCtl = require("../controllers/post");

router.post("/posts", auth, multer, postCtl.createPost);
router.get("/posts",auth , multer, postCtl.getAllPost);
router.get("/posts/:uuid", multer, postCtl.getOnePost);
router.delete("/posts/:uuid", auth, multer, postCtl.postDelete);
router.post("/posts/:uuid", auth,  postCtl.modifyLike)


module.exports = router;
