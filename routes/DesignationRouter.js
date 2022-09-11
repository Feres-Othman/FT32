const router = require("express").Router();
const verify = require("./TokenVerif");

const DesignationController = require("../controllers/DesignationController");

router.post("/add", verify, DesignationController.addDesignation);
router.post("/edit", verify, DesignationController.editDesignation);
router.post("/read/all", DesignationController.readDesignations);
router.post("/read/arbitre", DesignationController.readArbitre);
router.post("/arbitres/read/all", DesignationController.readArbitres);
router.delete("/delete/:id", DesignationController.deleteDesignation);




module.exports = router;
