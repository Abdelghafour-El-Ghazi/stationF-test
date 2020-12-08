<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="344"
      v-if="reservations && !reservations.length"
      elevation="15"
      outlined
      shaped
    >
      <v-card-title class="nomore">0 Réservations</v-card-title>
    </v-card>
    <v-simple-table v-if="reservations && reservations.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Date</th>
            <th class="text-left">Début</th>
            <th class="text-left">Fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, key) in reservations" :key="key">
            <td>{{ room.name }}</td>
            <td>{{ room.chosenDate }}</td>
            <td>{{ room.chosenStartTime + "h" }}</td>
            <td>{{ room.chosenEndTime + "h" }}</td>
            <td>
              <button v-on:click="Cancel(key)">ANNULER</button>
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
      color="red"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>
    
<script>
export default {
  data: () => {
    return {
      reservations: [],
      snackbar: false,
      text: "Réservation Annulée !!",
      timeout: 3000,
    };
  },
  methods: {
    fetch() {
      const apiUrl = "http://localhost:5000";
      //getting the reservations
      this.$http.get(`${apiUrl}/reservations`).then((result) => {
        this.reservations = result.data;
      });
    },
    Cancel: function (key) {
      const apiUrl = "http://localhost:5000";
      //deleting a reservation from the database and the
      this.$http
        .delete(`${apiUrl}/reservations/${this.reservations[key]._id}`)
        .then((result) => {
          console.log(result.data.message);
          this.reservations = this.reservations.filter((reservation) => {
            return this.reservations[key] != reservation;
          });
          this.snackbar = true;
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