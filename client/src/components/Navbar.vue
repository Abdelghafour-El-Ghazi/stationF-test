<template>
  <div>
    <img :src="image" alt="StationF" />
    <ul>
      <li><router-link to="/">RESERVER</router-link></li>
      <li><router-link to="/reservations">RESERVATIONS </router-link></li>
    </ul>
  </div>
</template>
    
<script>
import image from "../assets/station-f-logo-white.svg";
export default {
  data: () => ({
    image: image,
    //
  }),
};
</script>
<style lang="css" scoped>
img {
  background: black;
  height: 3em;
  width: auto;
  margin: 1.5em 0.5em;
}
ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: white;
}
li {
  color: white;
  margin-left: 2em;
}
a {
  outline: 0;
  text-decoration: none;
  color: white !important;
  font-size: large;
  position: relative;
}
a::after {
  content: "";
  display: block;
  position: absolute;
  height: 2px;
  left: 1px;
  right: 100%;
  bottom: -8px;
  background: transparent;
  transition: all 0.15s ease;
}
a:hover:after {
  right: 1px;
  background: #ff00ae;
}

/* the selected route have a  text-decoration: underline */
.router-link-exact-active:after {
  right: 1px;
  background: #ff00ae;
}
</style>