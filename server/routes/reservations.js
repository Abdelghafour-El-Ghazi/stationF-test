const express = require("express");
const {
  Reserve,
  getReservations,
  deleteReservation,
} = require("../controllers/reservations.js");
const router = express.Router();

router.post("/", Reserve);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);

module.exports = { reservationRoutes: router };
