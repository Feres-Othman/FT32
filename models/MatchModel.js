const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MatchSchema = new Schema(
    {
        competition: { type: Object },

        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        date: { type: Date, required: true, default: Date.now },

        winner: { type: mongoose.Types.ObjectId, ref: 'Player' },
        looser: { type: mongoose.Types.ObjectId, ref: 'Player' },

        winnerPoints: { type: Number, required: true },
        looserPoints: { type: Number, required: true },

        winnerPreviousPoints: { type: Number, required: true },
        looserPreviousPoints: { type: Number, required: true },

        contest: {
            type: Object
        },

        isDouble: {
            type: Boolean
        },

        isTeam: {
            type: Boolean
        },
        teamMatch: {
            type: mongoose.Types.ObjectId, ref: 'TeamMatch'
        },
        team1Player1: {
            type: mongoose.Types.ObjectId, ref: 'Player'
        },
        team1Player2: {
            type: mongoose.Types.ObjectId, ref: 'Player'
        },
        team2Player1: {
            type: mongoose.Types.ObjectId, ref: 'Player'
        },
        team2Player2: {
            type: mongoose.Types.ObjectId, ref: 'Player'
        },

    },
    { timestamps: true }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
