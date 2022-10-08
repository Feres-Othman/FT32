const { findOne } = require('../models/TeamModel');
const Team = require('../models/TeamModel')
const deleteTeam = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    await Team.findByIdAndRemove(id);



    res.json({ message: "Player deleted successfully." });
};
const createTeam = async (req, res) => {

    const name = req.body.Nom;
    const team1 = await Team.findOne({ name: name })
    if (!team1) {


        let isBanned
        console.log(req.body.Banned._id)
        if (req.body.Banned._id == "F") {
            isBanned = false
        } else if (req.body.Banned._id == "O") {
            isBanned = true


        }



        const newTeam = new Team({
            name, isBanned
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
    } else if (team1) {
        res.json({
            samename: true,

        })
    }
}
const readTeam1 = async (req, res, next) => {

    // const id = req.user._id;

    try {

        const id = req.params._id;


        const team = await Team.findOne({ _id: id })


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

const readTeam = async (req, res, next) => {

    // const id = req.user._id;

    try {

        const clubName = req.body.clubName;

        console.log(clubName)

        const team = await Team.findOne({ name: clubName })
            .populate({
                path: "players_v2",
                populate: {
                    path: 'category2'
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
        let teams;

        if (req.body.dontReadPlayers) {
            teams = await Team.find({})
                .exec();
        } else {
            teams = await Team.find({})
                .populate("players_v2")
                .populate({
                    path: "matches1",
                    populate: {
                        path: "matches",
                    }
                })
                .populate({
                    path: "matches2",
                    populate: {
                        path: "matches",
                    }
                })
                .exec();
        }

        if (!teams) return res.json({
            success: false,
            message: "Teams-not-found"
        })

        return res.json({ success: true, teams: teams });

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

const updateTeam = async (req, res) => {
    console.log("qweqwe", req.body)
    const id = req.params._id;
    const name = req.body.Nom;
    const zone = req.body.Zone;
    console.log(req.params._id)

    try {


        const team1 = await Team.findOne({ _id: req.params._id })

        console.log(team1.name)
        console.log(name)

        if (name == team1.name) {
            if (req.body.Banned._id == "F") {
                isBanned = false
            } else if (req.body.Banned._id == "O") {
                isBanned = true


            }
            await Team.findOneAndUpdate({ _id: req.params._id }, {
                $set: {
                    isBanned,
                    zone,

                }
            });


            return res.json({
                success: true,
                team: team1
            })
        } else if (!(team1.name === name)) {

            const Team12 = await Team.findOne({ name: req.body.Nom })
            if (Team12) {


                return res.json({

                    samename: true,
                    message: "team already exist "
                })
            } else if (!Team12) {
                if (req.body.Banned._id == "F") {
                    isBanned = false
                } else if (req.body.Banned._id == "O") {
                    isBanned = true


                }
                await Team.findOneAndUpdate({ _id: req.params._id }, {
                    $set: {
                        name,
                        zone,
                        isBanned,

                    }
                });

                return res.json({
                    success: true,
                    player: Team12
                })
            }

        }
    } catch (error) {
        console.log(error)
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
    deleteTeam,
    readTeam1
}