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
        score: { type: Number },

        scores: { type: Array },
        indivBonuses: { type: Array },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        history: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Match' }],
        },
        isValid: { type: Boolean, default: false },

        scores2: { type: Array },
        indivBonuses2: { type: Array },
        category2: { type: mongoose.Types.ObjectId, ref: 'Category' },
        history2: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Match' }],
        },
        isValid2: { type: Boolean, default: false },

        team: { type: mongoose.Types.ObjectId, ref: 'Team' },
        sex: { type: String, required: true },
        indGenre: { type: Number },
        nat: { type: String, required: true },
        UniqueNumber: { type: String },

        isBanned: { type: Boolean, default: false },
        changedTeam: { type: Date, default: () => Date.now() - 2 * 366 * 24 * 60 * 60 * 1000 },

    },
    { timestamps: true }
);

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
