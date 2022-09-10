const Player = require('../models/PlayerModel')
const Category = require('../models/CategoryModel')
const Team = require('../models/TeamModel');
const League = require('../models/LeagueModel');





const contain = (line, number) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i][0] == number || line[i][1] == number) {
      return true;
    }
  }
  return false;
}

const pickLast = (restColumns, line, combs, number = -1) => {

  if (number == -1) {
    console.log({ line })
    // console.log({ combs })
    console.log({ restColumns })

    for (let i = 0; i < combs.length; i++) {

      if (!contain(line, combs[i][0]) && !contain(line, combs[i][1])) {
        if (restColumns == 0) {
          return combs[i];
        } else if (pickLast(restColumns - 1, [...line, combs[i]], combs.filter((comb, index) => index !== i))) {
          return combs[i];
        }

      }

    }
  } else {
    //iterate combs in reverse
    for (let i = combs.length - 1; i >= 0; i--) {
      if (combs[i][0] == number) {
        return combs[i];
      }
    }
  }


}

const getBestFit = (combs, n, l, i, line) => {
  let bestFit = []
  // console.log({ l })
  // console.log({ i })
  // console.log({ n })
  // console.log((i + 1))
  // console.log((n - l - i))
  // console.log({ comb })

  for (let j = 0; j < combs.length; j++) {
    let comb = combs[j];

    if (comb[0] == (i + 1) && comb[1] == (n - l - i)) {
      bestFit = comb;
      break;
    }
  }

  if (!bestFit.length) {

    if (!contain(line, (i + 1))) {
      bestFit = pickLast((n / 2) - i - 1, line, combs, (i + 1));
    } else {
      bestFit = pickLast((n / 2) - i - 1, line, combs);
    }
  }

  console.log({ bestFit })
  return bestFit || [-1, -1];
}


const generateMatrix = (n) => {

  let lines = n % 2 ? n : (n - 1);

  let columns = n % 2 ? (n + 1) / 2 : n / 2;

  let matrix = []

  teamArray = Array.from(Array(lines + 1).keys())

  let combs = teamArray.flatMap(
    (v, i) => teamArray.slice(i + 1).map(w => [(v + 1), (parseInt(w) + 1)])
  );


  console.log(columns)
  console.log(lines)

  for (let l = 0; l < lines; l++) {
    let line = [];
    for (let i = 0; i < columns; i++) {
      let tempComb = getBestFit(combs, lines + 1, l, i, line)
      line.push(tempComb);
      combs = combs.filter(comb => comb[0] !== tempComb[0] || comb[1] !== tempComb[1]);
    }
    // console.log(line)
    matrix.push(line);
  }

  console.log(matrix)

  for (const l in matrix) {

    matrix[l] = matrix[l].filter(col => col[0] <= n && col[1] <= n);

  }

  console.log(matrix)
  return matrix;

}


const generateSingleDay = (teams, index, combs) => {


  let day = {
    index: index,
    date: "15 sep",
    matches: [
      // {
      //   team1: "AchS",
      //   team2: "Ams",
      //   team1Score: 6,
      //   team2Score: 3,
      // }
    ]
  };

  for (const comb of combs) {
    day.matches.push({
      team1: teams[comb[0] - 1].name,
      team1Id: teams[comb[0] - 1]._id,
      team2: teams[comb[1] - 1].name,
      team2Id: teams[comb[1] - 1]._id,
      team1Score: -1,
      team2Score: -1,

    })
  }


  return day;


}

const generateDays = (pools) => {
  let poolsWithDays = [];

  for (let i = 0; i < pools.length; i++) {
    let dayCount = pools[i].teams.length % 2 ? pools[i].teams.length * 2 : (pools[i].teams.length - 1) * 2;

    let matrix = generateMatrix(pools[i].teams.length)

    matrix = [...matrix, ...matrix];

    pools[i].days = []
    for (let j = 0; j < dayCount; j++) {
      console.log(j)
      pools[i].days.push(generateSingleDay(pools[i].teams, j, matrix[j]));
    }

    poolsWithDays.push(pools[i]);
  }

  return poolsWithDays;


}

const addLeague = async (req, res, next) => {


  const category = req.body.category;

  let pools = req.body.pools;

  pools = generateDays(pools);

  const type = req.body.type;
  const gender = req.body.gender;
  const calendar = req.body.calendar;

  let league = new League({
    category: category,
    type: type,
    gender: gender,
    calendar: calendar || "62de6a01d1a015170ce8dd8b",
    pools: pools
  })

  league.save();

  res.json({
    success: true,
    // newMatch: newMatch
  })

  return;
}

const playLeague = async (req, res, next) => {


  let league = await League.findOneAndUpdate({ _id: req.body._id, [`pools.${req.body.pool}.days.index`]: req.body.day.index }, {
    $set: {
      [`pools.${req.body.pool}.days.$.matches`]: req.body.day.matches
    }
  })

  league = await League.findOne({ _id: req.body._id })

  let teams = [];

  for (const team of league.pools[req.body.pool].teams) {
    let tempTeam = { ...team, won: 0, forfit: 0, lost: 0, p: 0, c: 0 }

    for (const day of league.pools[req.body.pool].days) {
      for (const match of day.matches) {

        let team1Score = parseInt(match.team1Score);
        let team2Score = parseInt(match.team2Score);

        if (team1Score == -1 || team2Score == -1) { continue }
        if (match.team1Id == tempTeam._id) {

          if (team1Score > team2Score) {
            tempTeam.won++;
            tempTeam.p += team1Score;
            tempTeam.c += team2Score;
          } else if (team1Score < team2Score) {
            tempTeam.lost++;
            tempTeam.p += team1Score;
            tempTeam.c += team2Score;
          } else {
            tempTeam.forfit++;
            tempTeam.p += team1Score;
            tempTeam.c += team2Score;
          }

        } else if (match.team2Id == tempTeam._id) {

          if (team1Score > team2Score) {
            tempTeam.lost++;
            tempTeam.p += team2Score;
            tempTeam.c += team1Score;
          } else if (team1Score < team2Score) {
            tempTeam.won++;
            tempTeam.p += team2Score;
            tempTeam.c += team1Score;
          } else {
            tempTeam.forfit++;
            tempTeam.p += team2Score;
            tempTeam.c += team1Score;
          }

        }
      }
    }
    console.log(tempTeam)
    teams.push(tempTeam);


  }

  league = await League.findOneAndUpdate({ _id: req.body._id }, {
    $set: {
      [`pools.${req.body.pool}.teams`]: teams
    }
  })


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



    const leagues = await League.find({})
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("calendar")
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
      .populate("category")
      .populate("calendar")
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
  playLeague,
  readLeagues,
  readLeague,
  deleteLeague,
  editLeague
}

