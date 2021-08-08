const router = require("express").Router();
const verify = require("./TokenVerif");

const TeamController = require("../controllers/TeamController");

router.post("/read/all", TeamController.readTeams);
router.post("/read/one", TeamController.readTeam);
router.post("/create", verify, TeamController.createTeam);
router.post("/update", verify, TeamController.updateTeam);
router.post("/ban", verify, TeamController.banTeam);

module.exports = router;
