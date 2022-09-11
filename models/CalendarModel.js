const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalendarSchema = new Schema(
    {
        name: { type: String },
        location: { type: String },
        color: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        public: { type: Boolean, default: false }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)




const Calendars = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendars;
