const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MatchSchema = new Schema(
    {
        type: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        place: { type: String },
        winner: { type: mongoose.Types.ObjectId, ref: 'Player' },
        looser: { type: mongoose.Types.ObjectId, ref: 'Player' },
        winnerPoints: { type: Number, required: true },
        looserPoints: { type: Number, required: true },
        winnerPreviousPoints: { type: Number, required: true },
        looserPreviousPoints: { type: Number, required: true },

    },
    { timestamps: true }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
