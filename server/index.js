const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const salles = require("./salles/salles.json"); // list of the rooms available at Station F

const { reservationRoutes } = require("./routes/reservations.js");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/reservations", reservationRoutes);

app.get("/salles", (req, res) => {
  res.json(salles);
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `Server Running on Port: http://localhost:${process.env.PORT}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
