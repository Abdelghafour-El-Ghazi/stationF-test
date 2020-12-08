<template>
  <v-app>
    <v-main>
      <Navbar class="nav" />
      <!-- <Free class="Free" />
      <Reservations /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import Navbar from "./components/Navbar";
// import Free from "./components/Free/Free";
// import Reservations from "./components/Reservations";
export default {
  name: "App",

  components: {
    Navbar,
    // Free,
    // Reservations,
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Signika&display=swap");

:root {
  font-family: "Signika", sans-serif !important;
}
.nav {
  display: flex;
  flex-direction: row;
  background: black;
  width: 100vw;
  height: 6em;
}
.Free {
  width: 100vw;
}
</style>