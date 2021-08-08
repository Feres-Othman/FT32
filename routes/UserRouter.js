const router = require("express").Router();
const verify = require("./TokenVerif");

const userController = require("../controllers/UserController");

router.post("/register", userController.register)
router.post("/login", userController.login)

// router.post("/login/fb", userController.fbLogin)

// router.post("/password/forget", userController.forgetPassword)
// router.post("/password/reset", userController.resetPassword)

router.post("/profile/get", verify, userController.profile);

module.exports = router;
