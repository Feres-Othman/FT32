const router = require("express").Router();
const verify = require("./TokenVerif");

const multer = require('multer')
const NewsController = require("../controllers/NewsController");

var upload = multer()

router.post("/add", verify, upload.any(), NewsController.addNews);
router.post("/edit", verify, NewsController.editNews);
router.post("/read/all", NewsController.readNewss);
// router.post("/read/one/:_id", NewsController.readNews);
router.delete("/delete/:id", NewsController.deleteNews);




module.exports = router;
