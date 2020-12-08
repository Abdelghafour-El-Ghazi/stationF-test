<template>
  <div>
    <ControlBar
      v-bind:capacity="capacity"
      v-bind:loading="loading"
      v-on:changeHandler="updateHandler"
    />
    <v-card
      class="mx-auto"
      max-width="344"
      v-if="freerooms && !freerooms.length"
      elevation="15"
      outlined
      shaped
    >
      <v-card-title class="nomore"
        >Toutes les salles sont réservées :/</v-card-title
      >
    </v-card>

    <v-simple-table v-if="freerooms && freerooms.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Description</th>
            <th class="text-left">Capacité</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, key) in freerooms" :key="key">
            <td>{{ room.name }}</td>
            <td>{{ room.description }}</td>
            <td>{{ room.capacity }}</td>
            <td>
              <button v-on:click="Reserve(key)">RESERVER</button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- snackbar for the alerts -->
    <v-snackbar
      v-model="snackbar"
      top
      right
      rounded="pill"
      :timeout="timeout"
      color="success"
    >
      Réservation effectuée :D
    </v-snackbar>
    <v-snackbar
      v-model="snackbarAlert"
      top
      right
      rounded="pill"
      :timeout="timeout"
      color="red"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>


<script>
import ControlBar from "./ControlBar";
import { minDay, nextDayTime, hh } from "../../util/handleTime";

export default {
  name: "free",
  components: {
    ControlBar,
  },
  data() {
    return {
      rooms: [],
      picker: new Date().toISOString().substr(0, 10),
      freerooms: this.rooms,
      capacity: 1,
      equipements: [],
      chosenDate: minDay,
      chosenStartTime: nextDayTime ? 8 : hh + 1,
      chosenEndTime: nextDayTime ? 9 : hh + 2,
      reservations: [],
      snackbar: false,
      snackbarAlert: false,
      text: "",
      snackbarColor: "success",
      timeout: 10000,
    };
  },
  methods: {
    fetch() {
      const apiUrl = "http://localhost:5000";
      //get the list of the rooms
      this.$http
        .get(`${apiUrl}/salles`)
        .then((result) => {
          //get the list of the rooms
          this.rooms = result.data.rooms;

          this.freerooms = this.rooms.filter(
            (room) => room.capacity >= this.capacity
          );
        })
        .catch((err) => console.log(err));
      //get the list of the reservations from the database
      this.$http
        .get(`${apiUrl}/reservations`)
        .then((result) => {
          this.reservations = result.data;
          const minDayReservations = this.reservations.filter((reservation) => {
            if (reservation.chosenDate === this.chosenDate) {
              if (
                (reservation.chosenStartTime < this.chosenStartTime &&
                  this.chosenStartTime < reservation.chosenEndTime) ||
                (this.chosenStartTime <= reservation.chosenStartTime &&
                  reservation.chosenStartTime <= this.chosenEndTime)
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });

          //when first visiting the app, Only show the rooms that are not reserved for the next hour...

          this.freerooms = this.freerooms.filter((room) => {
            return minDayReservations.every(
              (reservation) => reservation.name != room.name
            );
          });
        })
        .catch((err) => console.log(err));
    },
    updateHandler: function (
      capacity,
      equipements,
      chosenDate,
      chosenStartTime,
      chosenEndTime
    ) {
      this.capacity = capacity;
      this.equipements = equipements;
      this.chosenDate = chosenDate;
      this.chosenStartTime = chosenStartTime;
      this.chosenEndTime = chosenEndTime;

      this.freerooms = this.rooms.filter(
        (room) => room.capacity >= this.capacity
      );
      this.freerooms = this.freerooms.filter((room) => {
        const equipements = room.equipements.map((e) => e.name);
        return this.equipements.every((val) => equipements.includes(val));
      });

      const chosenDayReservations = this.reservations.filter((reservation) => {
        if (reservation.chosenDate === this.chosenDate) {
          if (
            (reservation.chosenStartTime <= this.chosenStartTime &&
              this.chosenStartTime < reservation.chosenEndTime) ||
            (this.chosenStartTime <= reservation.chosenStartTime &&
              reservation.chosenStartTime < this.chosenEndTime)
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      this.freerooms = this.freerooms.filter((room) => {
        return chosenDayReservations.every(
          (reservation) => reservation.name != room.name
        );
      });
    },
    Reserve: function (key) {
      const {
        name,
        description,
        capacity,
        equipements,
        createdAt,
        updatedAt,
      } = this.freerooms[key];
      

      

      if (this.chosenEndTime < this.chosenStartTime) {
        this.text = "L'heure de la fin doit être aprés le début !!";
        this.snackbarAlert = true;
        return;
      }
      
      if (this.chosenEndTime === this.chosenStartTime) {
        this.text = "Il faut réserver un minimum d'une heure!!";
        this.snackbarAlert = true;
        return;
      }

      const apiUrl = "http://localhost:5000";
      this.$http
        .post(
          `${apiUrl}/reservations`,
          {
            name,
            description,
            capacity,
            equipements,
            chosenDate: this.chosenDate,
            chosenStartTime: this.chosenStartTime,
            chosenEndTime: this.chosenEndTime,
            createdAt,
            updatedAt,
          },
          {
            emulateJSON: true, // <-- This was missing
          }
        )
        .then((result) => {
          //if the reservation is success then remove that room for that range of time
          if (result.status === 201) {
            this.reservations.push(result.data);
            const chosenRoom = this.freerooms[key];
            this.freerooms = this.freerooms.filter(
              (room) => room != chosenRoom
            );
            this.snackbar = true;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
<style lang="css" scoped>
button {
  color: #fff;
  display: block;
  background: #ff00ae;
  padding: 8px 20px 8px 20px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}
button:hover {
  color: #ff00ae;
  background: #fff;
  border: 1px solid #ff00ae;
}

.nomore {
  margin: 0 auto;
  height: 50vh;
  width: 30vw;
}
</style>