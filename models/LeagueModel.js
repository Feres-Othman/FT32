const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LeagueSchema = new Schema(
    {
        type: { type: Object },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        gender: { type: String },
        phase1: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
        },
        phase2: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
        },
        phase3: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
        }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)




const Leagues = mongoose.model("League", LeagueSchema);

module.exports = Leagues;
