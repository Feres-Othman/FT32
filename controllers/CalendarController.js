const Player = require('../models/PlayerModel')
const Category = require('../models/CategoryModel')
const Team = require('../models/TeamModel');
const Calendar = require('../models/CalendarModel');


const addCalendar = async (req, res, next) => {


  const name = req.body.name;

  const location = req.body.location;
  const color = req.body.color;

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const public = req.body.isPublic;

  let calendar = new Calendar({
    name, location, startDate, endDate, color, public
  })

  calendar.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}


const editCalendar = async (req, res, next) => {


  const name = req.body.name;

  const location = req.body.location;
  const color = req.body.color;

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const public = req.body.isPublic;


  let calendar = await Calendar.findOneAndUpdate({ _id: req.body._id }, {
    name, location, startDate, endDate, color, public
  })

  // category: category,
  // type: type,
  // gender: gender,
  // phase1: [...players1[0], ...players2[0], ...players3[0], ...players4[0], ...players5[0], ...players6[0], ...players7[0], ...players8[0]],
  // phase2: [...players1[1], ...players2[1], ...players3[1], ...players4[1], ...players5[1], ...players6[1], ...players7[1], ...players8[1]],
  // phase3: [...players1[2], ...players2[2], ...players3[2], ...players4[2], ...players5[2], ...players6[2], ...players7[2], ...players8[2]]


  // calendar.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}

const readCalendars = async (req, res, next) => {

  try {

    const calendars = await Calendar.find({})
      .exec();

    if (!calendars) return res.json({
      success: false,
      message: "Players-not-found"
    })

    return res.json({ success: true, calendars: calendars });

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "server-error"
    })
  }

}


const deleteCalendar = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  await Calendar.findByIdAndRemove(id);

  res.json({ message: "Calendar deleted successfully." });
}


const readCalendar = async (req, res, next) => {
  console.log(req.params._id)
  const { id } = req.params._id;
  try {

    const calendar = await Calendar.findOne({ _id: req.params._id })
      .populate("category")
      .exec();

    console.log(calendar)

    if (!calendar) return res.json({
      success: false,
      message: "Player-not-found"
    })
    else if (calendar) {
      return res.json({
        success: true,
        calendar: calendar
      })

    }
  } catch (error) {
    console.log(error)

    return res.json({
      success: false,
      message: "server-error",

    })
  }
}

module.exports = {
  addCalendar,
  readCalendars,
  readCalendar,
  deleteCalendar,
  editCalendar
}

