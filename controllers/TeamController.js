const Team = require('../models/TeamModel')

const createTeam = async (req, res, next) => {

    const name = req.body.name;
    const players = req.body.players;


    const newTeam = new Team({
        name, players
    });

    newTeam.save()
        .then(() => {

            res.json({
                success: true,
                newTeam: newTeam
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

const readTeam = async (req, res, next) => {

    // const id = req.user._id;

    try {

        const clubName = req.body.clubName;

        console.log(clubName)

        const team = await Team.findOne({ name: clubName })
            .populate({
                path: "players",
                populate: {
                    path: 'category'
                }
            })
            .exec();

        if (!team) return res.json({
            success: false,
            message: "Team-not-found"
        })

        return res.json({
            success: true,
            team: team
        })


    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "server-error"
        })
    }
}

const readTeams = async (req, res, next) => {

    try {
        const Teams = await Team.find({})
            .populate("players")
            .exec();

        if (!Teams) return res.json({
            success: false,
            message: "Teams-not-found"
        })

        return res.json({ success: true, teams: Teams });

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "server-error"
        })
    }

}

const banTeam = (req, res, next) => {

    try {
        const idTeam = req.body.idTeam;

        Team.findOneAndUpdate({ _id: idTeam }, { isBanned: true }, function (err, doc) {
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

const updateTeam = (req, res, next) => {

    try {
        const idTeam = req.body.idTeam;

        const name = req.body.name;
        const players = req.body.players;

        const newTeam = {};

        if (name) {
            newTeam.name = name;
        }

        if (players) {
            newTeam.players = players;
        }



        Team.findOneAndUpdate({ _id: idTeam }, newTeam, function (err, doc) {
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
    createTeam,
    readTeam,
    readTeams,
    banTeam,
    updateTeam,
}