const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true, minlength: 1 },
        userName: {
            type: String, required: true, trim: true, minlength: 1, unique: true,
        },
        lastName: { type: String, required: true, trim: true, minlength: 1 },
        cin: { type: String, required: true, trim: true, minlength: 1 },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 1,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
