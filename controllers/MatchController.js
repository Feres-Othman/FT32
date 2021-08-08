const Match = require('../models/MatchModel')

const createMatch = async (req, res, next) => {

    const type = req.body.type;
    const typeNumber = req.body.typeNumber;
    const category = req.body.category;
    const categoryNumber = req.body.categoryNumber;
    const date = req.body.date;
    const time = req.body.time;
    const place = req.body.place;
    const winner = req.body.winner;
    const looser = req.body.looser;


    const winnerPreviousPoints = req.body.winnerPreviousPoints;
    const looserPreviousPoints = req.body.looserPreviousPoints;

    let coef = 0;

    switch (typeNumber) {

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

        default:
            break;
    }

    let forWinner = 0;
    let forLooser = 0;

    let difference = winnerPreviousPoints - looserPreviousPoints;

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

    winnerPoints = Math.round(winnerPoints);
    looserPoints = Math.round(looserPoints);

    let IndivBonus = 0;
    let indivBonusCoef = (typeNumber === 1 ? 1 : typeNumber === 2 ? 0.5 : 0);

    switch (categoryNumber) {
        case 1:
            IndivBonus = indivBonusCoef * 24;
            break;

        case 2:
            IndivBonus = indivBonusCoef * 20;
            break;

        case 3:
            IndivBonus = indivBonusCoef * 16;
            break;

        case 4:
            IndivBonus = indivBonusCoef * 12;
            break;

        case 5:
            IndivBonus = indivBonusCoef * 8;
            break;

        case 6:
            IndivBonus = indivBonusCoef * 4;
            break;

        case 7:
            IndivBonus = indivBonusCoef * 2;
            break;

        case 8:
            IndivBonus = indivBonusCoef * -5;
            break;

        default:
            break;
    }

    winnerPoints += IndivBonus;
    looserPoints += IndivBonus;


    const newMatch = new Match({
        type,
        date,
        time,
        place,
        winner,
        looser,
        category,

        winnerPoints,
        looserPoints,
        winnerPreviousPoints,
        looserPreviousPoints,
    });

    newMatch.save()
        .then(() => {

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
        Player.findOneAndUpdate({ $in: { history: idMatch } }, { $pull: { history: idMatch } }).exec();

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