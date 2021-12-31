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
    { timestamps: true, toJSON: { virtuals: true } })


TeamSchema.virtual('matches1', {
    ref: 'TeamMatch', // The model to use
    localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
    foreignField: 'team1', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

TeamSchema.virtual('matches2', {
    ref: 'TeamMatch', // The model to use
    localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
    foreignField: 'team2', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

TeamSchema.virtual('players_v2', {
    ref: 'Player', // The model to use
    localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
    foreignField: 'team', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});


const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
