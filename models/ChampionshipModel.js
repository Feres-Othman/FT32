const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChampionshipSchema = new Schema(
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




const Championships = mongoose.model("Championship", ChampionshipSchema);

module.exports = Championships;
