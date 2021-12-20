const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamMatchSchema = new Schema(
    {
        team1: {
            type: mongoose.Types.ObjectId, ref: 'team'
        },
        team2: {
            type: mongoose.Types.ObjectId, ref: 'team'
        }

    },
    { timestamps: true, toJSON: { virtuals: true } }
);

TeamMatchSchema.virtual('matches', {
    ref: 'Match', // The model to use
    localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
    foreignField: 'teamMatch', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

const TeamMatch = mongoose.model("TeamMatch", TeamMatchSchema);

module.exports = TeamMatch;
