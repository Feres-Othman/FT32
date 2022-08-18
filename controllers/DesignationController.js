const Player = require('../models/PlayerModel')
const Category = require('../models/CategoryModel')
const Arbitre = require('../models/ArbitreModel');
const Designation = require('../models/DesignationModel');



const addDesignation = async (req, res, next) => {

  const dateTime = req.body.dateTime;
  const lieu = req.body.lieu;
  const team1 = req.body.team1;
  const team2 = req.body.team2;
  const arbitre = req.body.arbitre;


  console.log(dateTime);
  console.log(new Date(dateTime));

  let designation = new Designation({
    dateTime: (new Date(dateTime)).toString(),
    lieu,
    team1,
    team2,
    arbitre
  })

  designation.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}

const editDesignation = async (req, res, next) => {


  const players1 = req.body.players1;
  const players2 = req.body.players2;
  const players3 = req.body.players3;
  const players4 = req.body.players4;
  const players5 = req.body.players5;
  const players6 = req.body.players6;
  const players7 = req.body.players7;
  const players8 = req.body.players8;


  let designation = await Designation.findOneAndUpdate({ _id: req.body._id }, {
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


  // designation.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}

const readDesignations = async (req, res, next) => {

  try {

    const designations = await Designation.find({})
      .sort({ datetime: -1 })
      .populate("team1")
      .populate("team2")
      .populate("arbitre")
      .exec();

    if (!designations) return res.json({
      success: false,
      message: "designations-not-found"
    })

    return res.json({ success: true, designations: designations });

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "server-error"
    })
  }

}


const readArbitres = async (req, res, next) => {

  try {

    const arbitres = await Arbitre.find({})
      .exec();

    if (!arbitres) return res.json({
      success: false,
      message: "arbitres-not-found"
    })

    return res.json({ success: true, arbitres: arbitres });

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "server-error"
    })
  }

}


const deleteDesignation = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  await Designation.findByIdAndRemove(id);

  res.json({ message: "Designation deleted successfully." });
}



module.exports = {
  addDesignation,
  readArbitres,
  readDesignations,
  deleteDesignation,
  editDesignation
}

