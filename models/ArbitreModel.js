const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArbitreSchema = new Schema(
    {
        number: { type: String },
        name: { type: String },
        description: { type: String },
        badge: { type: String },
        phone: { type: Number },
        email: { type: String },
        adresse: { type: String },

    },
    { timestamps: true }
);

const Arbitre = mongoose.model("Arbitre", ArbitreSchema);

module.exports = Arbitre;
