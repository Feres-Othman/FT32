const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompetitionSchema = new Schema({
    name: {
        type: String
    },
    coef: {
        type: Number
    }
}, { timestamps: true })

const Competition = mongoose.model('Competition', CompetitionSchema)
module.exports = Competition