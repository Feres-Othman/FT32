const router = require("express").Router();
const verify = require("./TokenVerif");

const PlayerController = require("../controllers/CategoryController");

router.post("/read/all", PlayerController.readCategories);

module.exports = router;
