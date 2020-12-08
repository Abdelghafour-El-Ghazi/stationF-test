const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  capacity: { type: Number },
  equipements: [{ name: { type: String } }],
  chosenDate: String,
  chosenStartTime: Number,
  chosenEndTime: Number,
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
