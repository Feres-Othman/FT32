const Match = require('../models/MatchModel')
const Player = require('../models/PlayerModel');
const TeamMatch = require('../models/TeamMatchModel');

const createMatch = async (req, res, next) => {

    console.log(req.body)

    const competition = req.body.competition;
    const category = req.body.category;
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const isTeam = req.body.isTeam;

    const playerA = req.body.playerA;
    const playerB = req.body.playerB;
    const playerC = req.body.playerC;


    const playerX = req.body.playerX;
    const playerY = req.body.playerY;
    const playerZ = req.body.playerZ;


    const contests = req.body.contests;
    const teamContests = req.body.teamContests;
    const forceDuplicate = req.body.forceDuplicate;


    let coef = 0;

    switch (competition._id) {

        case 1:
            coef = 1.5;
            break;
        case 2:
            coef = 0.5;
            break;
        case 3:
            coef = 1;
            break;
        case 4:
            coef = 0.5;
            break;
        case 5:
            coef = 1;
            break;
        case 6:
            coef = 0.5;
            break;
        case 7:
            coef = 0.5;
            break;
        case 8:
            coef = 1;
            break;
        case 9:
            coef = 0.5;
            break;
        case 10:
            coef = 1;
            break;
        case 11:
            coef = 1;
            break;

        default:
            break;
    }

    console.log({ coef })

    if (isTeam) {

        let teamMatchExist = await TeamMatch.findOne({ team1: team1._id, team2: team2._id })

        if (teamMatchExist) {
            let teamMatches = [];
            for (const i in teamContests) {
                let winner = {};
                let looser = {};

                if (teamContests[i].player1Score > teamContests[i].player2Score) {
                    winner = (i == 0 || i == 4 || i == 7) ? playerA : (i == 1 || i == 3 || i == 6) ? playerB : (i == 2 || i == 5) ? playerC : playerA;
                    looser = (i == 0 || i == 3) ? playerX : (i == 1 || i == 5 || i == 7) ? playerY : (i == 2 || i == 4 || i == 6) ? playerZ : playerX;
                } else {
                    winner = (i == 0 || i == 3) ? playerX : (i == 1 || i == 5 || i == 7) ? playerY : (i == 2 || i == 4 || i == 6) ? playerZ : playerX;
                    looser = (i == 0 || i == 4 || i == 7) ? playerA : (i == 1 || i == 3 || i == 6) ? playerB : (i == 2 || i == 5) ? playerC : playerA;
                }

                let check = await Match.findOne({
                    winner,
                    looser,
                    competition,
                    isTeam: true,
                    category: category._id,
                    isDouble: teamContests[i].isDouble,

                    team1Player1: req.body.team1Player1._id,
                    team1Player2: req.body.team1Player2._id,
                    team2Player1: req.body.team2Player1._id,
                    team2Player2: req.body.team2Player2._id,
                })

                teamMatches.push(check?.teamMatch.toString())

            }
            console.log(teamMatches)
            console.log(teamMatches.every(element => { return element && (element == teamMatches[0]) }))
            if (!forceDuplicate) {
                return res.json({
                    success: false,
                    message: "duplicated"
                    // newMatch: newMatch
                })
            }

        }

        let teamMatch = new TeamMatch({
            team1: team1._id, team2: team2._id
        })

        await teamMatch.save();

        for (const i in teamContests) {
            // const element = teamContest[i];


            let forWinner = 0;
            let forLooser = 0;

            let scoreIndex = category.__v - 1;

            let winner = {};
            let looser = {};
            let contest = teamContests[i];

            if (teamContests[i].player1Score > teamContests[i].player2Score) {
                winner = (i == 0 || i == 4 || i == 7) ? playerA : (i == 1 || i == 3 || i == 6) ? playerB : (i == 2 || i == 5) ? playerC : playerA;
                looser = (i == 0 || i == 3) ? playerX : (i == 1 || i == 5 || i == 7) ? playerY : (i == 2 || i == 4 || i == 6) ? playerZ : playerX;
            } else {
                winner = (i == 0 || i == 3) ? playerX : (i == 1 || i == 5 || i == 7) ? playerY : (i == 2 || i == 4 || i == 6) ? playerZ : playerX;
                looser = (i == 0 || i == 4 || i == 7) ? playerA : (i == 1 || i == 3 || i == 6) ? playerB : (i == 2 || i == 5) ? playerC : playerA;
            }

            let difference = winner.scores[scoreIndex].score - looser.scores[scoreIndex].score;

            if (teamContests[i].player1Score === teamContests[i].player2Score && teamContests[i].player1Score === 0) {
                forWinner = 0;
                forLooser = 0;
            } else {
                switch (true) {
                    //victoire anormale
                    case (difference <= -500):
                        forWinner = 40;
                        forLooser = -29;
                        break;
                    //victoire anormale
                    case (difference <= -400):
                        forWinner = 28;
                        forLooser = -20;
                        break;

                    //victoire anormale
                    case (difference <= -300):
                        forWinner = 22;
                        forLooser = -16;
                        break;

                    //victoire anormale
                    case (difference <= -200):
                        forWinner = 17;
                        forLooser = -12.5;
                        break;

                    //victoire anormale
                    case (difference <= -150):
                        forWinner = 13;
                        forLooser = -10;
                        break;

                    //victoire anormale
                    case (difference <= -100):
                        forWinner = 10;
                        forLooser = -8;
                        break;

                    //victoire anormale
                    case (difference <= -50):
                        forWinner = 8;
                        forLooser = -7;
                        break;

                    //victoire anormale
                    case (difference <= -25):
                        forWinner = 7;
                        forLooser = -6;
                        break;

                    //victoire anormale
                    case (difference <= 0):
                        forWinner = 6;
                        forLooser = -5;
                        break;





                    //victoire normale
                    case (difference < 25):
                        forWinner = 6;
                        forLooser = -5;
                        break;
                    //victoire normale
                    case (difference < 50):
                        forWinner = 5.5;
                        forLooser = -4.5;
                        break;

                    //victoire normale
                    case (difference < 100):
                        forWinner = 5;
                        forLooser = -4;
                        break;

                    //victoire normale
                    case (difference < 150):
                        forWinner = 4;
                        forLooser = -3;
                        break;

                    //victoire normale
                    case (difference < 200):
                        forWinner = 3;
                        forLooser = -2;
                        break;

                    //victoire normale
                    case (difference < 300):
                        forWinner = 2;
                        forLooser = -1;
                        break;

                    //victoire normale
                    case (difference < 400):
                        forWinner = 1;
                        forLooser = -0.5;
                        break;

                    //victoire normale
                    case (difference < 500):
                        forWinner = 0.5;
                        forLooser = -0;
                        break;


                    //victoire normale +500
                    default:
                        forWinner = 0;
                        forLooser = 0;
                        break;
                }

            }

            let winnerPoints = coef * forWinner;
            let looserPoints = coef * forLooser;

            console.log({ winnerPoints, looserPoints })

            winnerPoints = Math.round(winnerPoints);
            looserPoints = Math.round(looserPoints);

            let winnerPreviousPoints = winner.scores[scoreIndex].score;
            let looserPreviousPoints = looser.scores[scoreIndex].score;

            const newMatch = new Match({
                competition,
                isTeam: true,
                category: category._id,
                isDouble: contest.isDouble,

                team1Player1: req.body.team1Player1._id,
                team1Player2: req.body.team1Player2._id,
                team2Player1: req.body.team2Player1._id,
                team2Player2: req.body.team2Player2._id,

                teamMatch,

                winner: winner._id,
                looser: looser._id,

                winnerPoints,
                looserPoints,

                winnerPreviousPoints,
                looserPreviousPoints,

                contest
            });

            winner.scores[scoreIndex].score += winnerPoints;
            looser.scores[scoreIndex].score += looserPoints;

            await newMatch.save();

            if (newMatch && !contest.isDouble) {
                await Player.findOneAndUpdate({ _id: winner._id }, { $push: { history2: newMatch._id }, scores2: winner.scores }, {}).exec();
                await Player.findOneAndUpdate({ _id: looser._id }, { $push: { history2: newMatch._id }, scores2: looser.scores }, {}).exec();
            }

        }

        res.json({
            success: true,
            // newMatch: newMatch
        })


    } else {

        let forWinner = 0;
        let forLooser = 0;

        let scoreIndex = category.__v - 1;

        let winner = {};
        let looser = {};
        let contest = contests[0];

        if (contests[0].player1Score > contests[0].player2Score) {
            winner = playerA;
            looser = playerX;
        } else {
            winner = playerX;
            looser = playerA;
        }

        let difference = contests[0].player1Score > contests[0].player2Score ? playerA.scores[scoreIndex].score - playerX.scores[scoreIndex].score : playerX.scores[scoreIndex].score - playerA.scores[scoreIndex].score;

        switch (true) {
            //victoire anormale
            case (difference <= -500):
                forWinner = 40;
                forLooser = -29;
                break;
            //victoire anormale
            case (difference <= -400):
                forWinner = 28;
                forLooser = -20;
                break;

            //victoire anormale
            case (difference <= -300):
                forWinner = 22;
                forLooser = -16;
                break;

            //victoire anormale
            case (difference <= -200):
                forWinner = 17;
                forLooser = -12.5;
                break;

            //victoire anormale
            case (difference <= -150):
                forWinner = 13;
                forLooser = -10;
                break;

            //victoire anormale
            case (difference <= -100):
                forWinner = 10;
                forLooser = -8;
                break;

            //victoire anormale
            case (difference <= -50):
                forWinner = 8;
                forLooser = -7;
                break;

            //victoire anormale
            case (difference <= -25):
                forWinner = 7;
                forLooser = -6;
                break;

            //victoire anormale
            case (difference <= 0):
                forWinner = 6;
                forLooser = -5;
                break;





            //victoire normale
            case (difference < 25):
                forWinner = 6;
                forLooser = -5;
                break;
            //victoire normale
            case (difference < 50):
                forWinner = 5.5;
                forLooser = -4.5;
                break;

            //victoire normale
            case (difference < 100):
                forWinner = 5;
                forLooser = -4;
                break;

            //victoire normale
            case (difference < 150):
                forWinner = 4;
                forLooser = -3;
                break;

            //victoire normale
            case (difference < 200):
                forWinner = 3;
                forLooser = -2;
                break;

            //victoire normale
            case (difference < 300):
                forWinner = 2;
                forLooser = -1;
                break;

            //victoire normale
            case (difference < 400):
                forWinner = 1;
                forLooser = -0.5;
                break;

            //victoire normale
            case (difference < 500):
                forWinner = 0.5;
                forLooser = -0;
                break;


            //victoire normale +500
            default:
                forWinner = 0;
                forLooser = 0;
                break;
        }

        let winnerPoints = coef * forWinner;
        let looserPoints = coef * forLooser;

        console.log({ winnerPoints, looserPoints })

        winnerPoints = Math.round(winnerPoints);
        looserPoints = Math.round(looserPoints);

        let winnerPreviousPoints = winner.scores[scoreIndex].score;
        let looserPreviousPoints = looser.scores[scoreIndex].score;


        let check = await Match.findOne({
            competition,
            isTeam: false,
            category: category._id,
            isDouble: false,
            winner: winner._id,
            looser: looser._id,

        })

        console.log(check)

        if (check && !forceDuplicate) {
            return res.json({
                success: false,
                message: "duplicated"
                // newMatch: newMatch
            })
        }



        const newMatch = new Match({
            competition,
            isTeam: false,
            category: category._id,
            isDouble: false,

            winner: winner._id,
            looser: looser._id,

            winnerPoints,
            looserPoints,

            winnerPreviousPoints,
            looserPreviousPoints,

            contest
        });

        winner.scores[scoreIndex].score += winnerPoints;
        looser.scores[scoreIndex].score += looserPoints;

        newMatch.save()
            .then(async () => {

                await Player.findOneAndUpdate({ _id: winner._id }, { $push: { history2: newMatch._id }, scores2: winner.scores }, {}).exec();
                await Player.findOneAndUpdate({ _id: looser._id }, { $push: { history2: newMatch._id }, scores2: looser.scores }, {}).exec();

                res.json({
                    success: true,
                    newMatch: newMatch
                })





            })
            .catch(error => {
                console.log(error)
                res.json({
                    message: 'mongoose-error',
                    success: false
                })
            })

    }



    return;









    // let IndivBonus = 0;
    // let indivBonusCoef = (typeNumber === 1 ? 1 : typeNumber === 2 ? 0.5 : 0);

    // switch (categoryNumber) {
    //     case 1:
    //         IndivBonus = indivBonusCoef * 24;
    //         break;

    //     case 2:
    //         IndivBonus = indivBonusCoef * 20;
    //         break;

    //     case 3:
    //         IndivBonus = indivBonusCoef * 16;
    //         break;

    //     case 4:
    //         IndivBonus = indivBonusCoef * 12;
    //         break;

    //     case 5:
    //         IndivBonus = indivBonusCoef * 8;
    //         break;

    //     case 6:
    //         IndivBonus = indivBonusCoef * 4;
    //         break;

    //     case 7:
    //         IndivBonus = indivBonusCoef * 2;
    //         break;

    //     case 8:
    //         IndivBonus = indivBonusCoef * -5;
    //         break;

    //     default:
    //         break;
    // }

    // winnerPoints += IndivBonus;
    // looserPoints += IndivBonus;


}

const readMatch = async (req, res, next) => {

    // const id = req.user._id;

    try {

        const idMatch = req.body.idMatch;

        const Match = await Match.findOne({ _id: idMatch })
            .populate("category")
            .populate("type")
            .populate("winner")
            .populate("looser")
            .exec();

        if (!Match) return res.json({
            success: false,
            message: "Match-not-found"
        })

        return res.json({
            success: true,
            Match: Match
        })


    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }
}


const deleteMatch = (req, res, next) => {

    try {
        const idMatch = req.body.idMatch;
        Player.findOneAndUpdate({ $in: { history2: idMatch } }, { $pull: { history2: idMatch } }).exec();

        Match.deleteOne({ _id: idMatch }, function (err, doc) {
            if (err) return res.json({
                message: 'mongoose-error',
                success: false,
                err
            });
            return res.json({
                message: 'delete-success',
                success: true
            });
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }

}

const updateMatch = (req, res, next) => {

    try {
        const idMatch = req.body.idMatch;

        const type = req.body.firstName;
        const date = req.body.lastName;
        const time = req.body.number;
        const place = req.body.day;
        const winner = req.body.month;
        const looser = req.body.year;
        const category = req.body.category;
        const winnerPoints = req.body.score;
        const looserPoints = req.body.team;
        const winnerPreviousPoints = req.body.sex;
        const looserPreviousPoints = req.body.indGenre;

        const newMatch = {};

        if (type) {
            newMatch.type = type;
        }

        if (date) {
            newMatch.date = date;
        }

        if (time) {
            newMatch.time = time;
        }

        if (place) {
            newMatch.place = place;
        }

        if (winner) {
            newMatch.winner = winner;
        }

        if (looser) {
            newMatch.looser = looser;
        }

        if (category) {
            newMatch.category = category;
        }

        if (winnerPoints) {
            newMatch.winnerPoints = winnerPoints;
        }

        if (looserPoints) {
            newMatch.looserPoints = looserPoints;
        }

        if (winnerPreviousPoints) {
            newMatch.winnerPreviousPoints = winnerPreviousPoints;
        }

        if (looserPreviousPoints) {
            newMatch.looserPreviousPoints = looserPreviousPoints;
        }


        Match.findOneAndUpdate({ _id: idMatch }, newMatch, function (err, doc) {
            if (err) return res.json({
                message: 'mongoose-error',
                success: false,
                err
            });
            return res.json({
                message: 'update-success',
                success: true
            });
        });




    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }
}





module.exports = {
    createMatch,
    readMatch,
    deleteMatch,
    updateMatch,
}