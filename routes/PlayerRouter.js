const router = require("express").Router();
const verify = require("./TokenVerif");

const PlayerController = require("../controllers/PlayerController");

router.post("/read/all", PlayerController.readPlayers);
router.post("/read/category/all", PlayerController.readAllPlayers);
router.post("/read/one/:_id", PlayerController.readPlayer);
router.post("/update/:_id", PlayerController.updatePlayer);
router.post("/ban", verify, PlayerController.banPlayer);
router.post("/reset", verify, PlayerController.resetDB);
router.post("/resetPlayers", verify, PlayerController.resetPlayersScores);
router.post("/Ajoutjouer", PlayerController.createPlayer);
router.delete("/delete/:id", PlayerController.deletePlayers);




module.exports = router;
