const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalendarSchema = new Schema(
    {
        name: { type: String },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)




const Calendars = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendars;
