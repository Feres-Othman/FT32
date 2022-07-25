const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LeagueSchema = new Schema(
    {
        type: { type: Object },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        calendar: { type: mongoose.Types.ObjectId, ref: 'Calendar' },
        gender: { type: String },
        pools: { type: Array }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)




const Leagues = mongoose.model("League", LeagueSchema);

module.exports = Leagues;
