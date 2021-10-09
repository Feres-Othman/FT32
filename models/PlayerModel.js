const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true, minlength: 1 },
        lastName: { type: String, required: true, trim: true, minlength: 1 },
        number: { type: Number, required: true },
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },

        score: { type: Number, required: true },
        scores: { type: Array },

        team: { type: mongoose.Types.ObjectId, ref: 'Team' },
        sex: { type: String, required: true },
        indGenre: { type: Number, required: true },
        nat: { type: String, required: true },
        UniqueNumber: { type: String, required: true },
        history: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Match' }],
        },
        isBanned: { type: Boolean, default: false },
        changedTeam: { type: Date, default: () => Date.now() - 2 * 366 * 24 * 60 * 60 * 1000 },
        isValid: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
