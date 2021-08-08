const router = require("express").Router();
const verify = require("./TokenVerif");

const MatchController = require("../controllers/MatchController");

router.post("/read/one", verify, MatchController.readMatch);
router.post("/create", verify, MatchController.createMatch);
router.post("/update", verify, MatchController.updateMatch);
router.post("/delete", verify, MatchController.deleteMatch);

module.exports = router;
