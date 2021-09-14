const router = require("express").Router();
const verify = require("./TokenVerif");

const TeamController = require("../controllers/TeamController");

router.post("/read/all", TeamController.readTeams);
router.post("/read/one", TeamController.readTeam);
router.post("/read/one1/:_id", TeamController.readTeam1);

router.post("/create", TeamController.createTeam);
router.delete("/delete/:id", TeamController.deleteTeam);

router.post("/update/:_id",  TeamController.updateTeam);
router.post("/ban", verify, TeamController.banTeam);

module.exports = router;
