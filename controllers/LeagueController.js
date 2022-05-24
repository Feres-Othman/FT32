const Player = require('../models/PlayerModel')
const Category = require('../models/CategoryModel')
const Team = require('../models/TeamModel');
const League = require('../models/LeagueModel');


const addLeague = async (req, res, next) => {


  const category = req.body.category;

  const players1 = req.body.players1;
  const players2 = req.body.players2;
  const players3 = req.body.players3;
  const players4 = req.body.players4;
  const players5 = req.body.players5;
  const players6 = req.body.players6;
  const players7 = req.body.players7;
  const players8 = req.body.players8;

  const type = req.body.type;
  const gender = req.body.gender;

  let league = new League({
    category: category,
    type: type,
    gender: gender,
    phase1: [...players1[0], ...players2[0], ...players3[0], ...players4[0], ...players5[0], ...players6[0], ...players7[0], ...players8[0]],
    phase2: [...players1[1], ...players2[1], ...players3[1], ...players4[1], ...players5[1], ...players6[1], ...players7[1], ...players8[1]],
    phase3: [...players1[2], ...players2[2], ...players3[2], ...players4[2], ...players5[2], ...players6[2], ...players7[2], ...players8[2]]
  })

  league.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}


const editLeague = async (req, res, next) => {


  const players1 = req.body.players1;
  const players2 = req.body.players2;
  const players3 = req.body.players3;
  const players4 = req.body.players4;
  const players5 = req.body.players5;
  const players6 = req.body.players6;
  const players7 = req.body.players7;
  const players8 = req.body.players8;


  let league = await League.findOneAndUpdate({ _id: req.body._id }, {
    phase1: [...players1[0], ...players2[0], ...players3[0], ...players4[0], ...players5[0], ...players6[0], ...players7[0], ...players8[0]],
    phase2: [...players1[1], ...players2[1], ...players3[1], ...players4[1], ...players5[1], ...players6[1], ...players7[1], ...players8[1]],
    phase3: [...players1[2], ...players2[2], ...players3[2], ...players4[2], ...players5[2], ...players6[2], ...players7[2], ...players8[2]]
  })

  // category: category,
  // type: type,
  // gender: gender,
  // phase1: [...players1[0], ...players2[0], ...players3[0], ...players4[0], ...players5[0], ...players6[0], ...players7[0], ...players8[0]],
  // phase2: [...players1[1], ...players2[1], ...players3[1], ...players4[1], ...players5[1], ...players6[1], ...players7[1], ...players8[1]],
  // phase3: [...players1[2], ...players2[2], ...players3[2], ...players4[2], ...players5[2], ...players6[2], ...players7[2], ...players8[2]]


  // league.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}

const readLeagues = async (req, res, next) => {

  try {

    let finalCategories = [];

    let i = 0;

    let filter = {};

    if (!req.body.sex.toUpperCase().includes("X")) {

      filter.sex = req.body.sex.toUpperCase();

    }
    let chosenCategory = {}

    if (!req.body.category.toUpperCase().includes("TOUT")) {


      const categories = await Category.find({}).sort({ __v: 1 })

      for (i = 0; i < categories.length; i++) {
        const element = categories[i];

        if (element.name.toUpperCase() == req.body.category.toUpperCase()) {
          chosenCategory = element;
          break;
        }

      }

      for (let j = 0; j <= i; j++) {
        const element = categories[j];

        finalCategories.push(element._id);

      }

      filter.category = { $in: finalCategories }

    } else {
      const categories = await Category.find({}).sort({ __v: 1 })

      for (i = 0; i < categories.length; i++) {
        const element = categories[i];

        if (element.name.toUpperCase() == "Seniors".toUpperCase()) {
          chosenCategory = element;
          break;
        }

      }

      for (let j = 0; j <= i; j++) {
        const element = categories[j];

        finalCategories.push(element._id);

      }

      filter.category = { $in: finalCategories }
    }



    const leagues = await League.find(filter)
      .sort({ createdAt: -1 })
      .populate("phase1")
      .populate("phase2")
      .populate("phase3")
      .populate("category")
      .exec();

    if (!leagues) return res.json({
      success: false,
      message: "Players-not-found"
    })

    return res.json({ success: true, leagues: leagues });

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "server-error"
    })
  }

}


const deleteLeague = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  await League.findByIdAndRemove(id);

  res.json({ message: "League deleted successfully." });
}


const readLeague = async (req, res, next) => {
  console.log(req.params._id)
  const { id } = req.params._id;
  try {

    const league = await League.findOne({ _id: req.params._id })
      .populate({
        path: "phase1",
        populate: {
          path: 'team'
        }
      })
      .populate({
        path: "phase2",
        populate: {
          path: 'team'
        }
      })
      .populate({
        path: "phase3",
        populate: {
          path: 'team'
        }
      })
      .populate("category")

      .exec();

    console.log(league)

    if (!league) return res.json({
      success: false,
      message: "Player-not-found"
    })
    else if (league) {
      return res.json({
        success: true,
        league: league
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
  addLeague,
  readLeagues,
  readLeague,
  deleteLeague,
  editLeague
}

