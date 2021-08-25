const router = require("express").Router();
const verify = require("./TokenVerif");

const PlayerController = require("../controllers/PlayerController");

router.post("/read/all", PlayerController.readPlayers);
router.post("/read/category/all", PlayerController.readAllPlayers);
router.post("/read/one", verify, PlayerController.readPlayer);
router.post("/create", verify, PlayerController.createPlayer);
router.post("/update", verify, PlayerController.updatePlayer);
router.post("/ban", verify, PlayerController.banPlayer);
router.post("/reset", verify, PlayerController.resetDB);

module.exports = router;
