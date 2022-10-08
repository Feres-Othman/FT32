const router = require("express").Router();
const verify = require("./TokenVerif");

const PlayerController = require("../controllers/PlayerController");

router.post("/read/all", PlayerController.readPlayers);
router.post("/read/category/all", PlayerController.readAllPlayers);
router.post("/read/one/:_id", PlayerController.readPlayer);
router.post("/update/:_id", PlayerController.updatePlayer);
router.post("/ban", verify, PlayerController.banPlayer);
router.post("/reset", verify, PlayerController.resetDB);
router.post("/nextSeason", verify, PlayerController.nextSeason);
router.post("/resetPlayers", verify, PlayerController.resetPlayersScores);
router.post("/bonus", verify, PlayerController.addBonuses);
router.post("/championship", verify, PlayerController.addChampionship);
router.post("/championship/edit", verify, PlayerController.editChampionship);
router.post("/championship/read/all", PlayerController.readChampionships);
router.post("/championship/read/one/:_id", PlayerController.readChampionship);
router.post("/Ajoutjouer", PlayerController.createPlayer);
router.delete("/delete/:id", PlayerController.deletePlayers);
router.delete("/championship/delete/:id", PlayerController.deleteChampionship);




module.exports = router;
