const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema(
    {
        name: {
            type: String, required: true, trim: true, minlength: 1, unique: true,
        },
        players: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
        },
        isBanned: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
