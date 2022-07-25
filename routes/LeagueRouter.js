const router = require("express").Router();
const verify = require("./TokenVerif");

const LeagueController = require("../controllers/LeagueController");

router.post("/add", verify, LeagueController.addLeague);
router.post("/play", verify, LeagueController.playLeague);
router.post("/edit", verify, LeagueController.editLeague);
router.post("/read/all", LeagueController.readLeagues);
router.post("/read/one/:_id", LeagueController.readLeague);
router.delete("/delete/:id", LeagueController.deleteLeague);




module.exports = router;
