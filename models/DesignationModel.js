const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DesignationSchema = new Schema(
    {
        dateTime: { type: Date, default: Date.now },
        lieu: { type: String },
        team1: { type: mongoose.Types.ObjectId, ref: 'Team' },
        team2: { type: mongoose.Types.ObjectId, ref: 'Team' },
        arbitre: { type: mongoose.Types.ObjectId, ref: 'Arbitre' }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)




const Designations = mongoose.model("Designation", DesignationSchema);

module.exports = Designations;
