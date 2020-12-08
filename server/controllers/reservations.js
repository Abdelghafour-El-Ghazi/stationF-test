const Reservation = require("../models/reservations");
const mongoose = require("mongoose");

const Reserve = async (req, res) => {
  const {
    name,
    description,
    capacity,
    equipements,
    chosenDate,
    chosenStartTime,
    chosenEndTime,
    createdAt,
    updatedAt,
  } = req.body;

  const newReservation = new Reservation({
    name,
    description,
    capacity,
    equipements,
    chosenDate,
    chosenStartTime,
    chosenEndTime,
    createdAt,
    updatedAt,
  });

  try {
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const Reservations = await Reservation.find();
    res.status(200).json(Reservations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No reservation with id: ${id}`);

  await Reservation.findByIdAndRemove(id);

  res.json({ message: "Reservation deleted successfully." });
};
module.exports = { Reserve, getReservations, deleteReservation };
