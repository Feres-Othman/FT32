const router = require("express").Router();
const verify = require("./TokenVerif");

const CalendarController = require("../controllers/CalendarController");

router.post("/add", verify, CalendarController.addCalendar);
router.post("/edit", verify, CalendarController.editCalendar);
router.post("/read/all", CalendarController.readCalendars);
router.delete("/delete/:id", CalendarController.deleteCalendar);




module.exports = router;
