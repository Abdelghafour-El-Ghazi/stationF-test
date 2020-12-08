<template>
  <v-toolbar color="purple" dark>
    <input
      type="date"
      v-model="chosenDate"
      v-on:change="changeHandler"
      v-bind:min="minDay"
    />
    <v-divider class="mx-2" vertical inset></v-divider>
    <label for="from">Début: </label>
    <select
      v-model="chosenStartTime"
      v-on:change="changeHandler"
      name="from"
      id="from"
    >
      <!-- v-if in evey option to make sure not to reserve in the past -->

      <option v-if="!(chosenDate === today && 8 < hh + 1)" value="8">
        8:00
      </option>
      <option v-if="!(chosenDate === today && 9 < hh + 1)" value="9">
        9:00
      </option>
      <option v-if="!(chosenDate === today && 10 < hh + 1)" value="10">
        10:00
      </option>
      <option v-if="!(chosenDate === today && 11 < hh + 1)" value="11">
        11:00
      </option>
      <option v-if="!(chosenDate === today && 12 < hh + 1)" value="12">
        12:00
      </option>
      <option v-if="!(chosenDate === today && 13 < hh + 1)" value="13">
        13:00
      </option>
      <option v-if="!(chosenDate === today && 14 < hh + 1)" value="14">
        14:00
      </option>
      <option v-if="!(chosenDate === today && 15 < hh + 1)" value="15">
        15:00
      </option>
      <option v-if="!(chosenDate === today && 16 < hh + 1)" value="16">
        16:00
      </option>
      <option v-if="!(chosenDate === today && 17 < hh + 1)" value="17">
        17:00
      </option>
    </select>
    <v-divider class="mx-4" vertical inset></v-divider>
    <label for="to">Fin: </label>
    <select
      v-model="chosenEndTime"
      v-on:change="changeHandler"
      name="to"
      id="to"
    >
      <!-- v-if in evey option to make sure not to reserve in the past -->
      <option v-if="!(chosenDate === today && 9 < hh + 2)" value="9">
        9:00
      </option>
      <option v-if="!(chosenDate === today && 10 < hh + 2)" value="10">
        10:00
      </option>
      <option v-if="!(chosenDate === today && 11 < hh + 2)" value="11">
        11:00
      </option>
      <option v-if="!(chosenDate === today && 12 < hh + 2)" value="12">
        12:00
      </option>
      <option v-if="!(chosenDate === today && 13 < hh + 2)" value="13">
        13:00
      </option>
      <option v-if="!(chosenDate === today && 14 < hh + 2)" value="14">
        14:00
      </option>
      <option v-if="!(chosenDate === today && 15 < hh + 2)" value="15">
        15:00
      </option>
      <option v-if="!(chosenDate === today && 16 < hh + 2)" value="16">
        16:00
      </option>
      <option v-if="!(chosenDate === today && 17 < hh + 2)" value="17">
        17:00
      </option>
      <option v-if="!(chosenDate === today && 18 < hh + 2)" value="18">
        18:00
      </option>
    </select>
    <!-- <v-spacer></v-spacer> -->
    <v-divider class="mx-4" vertical inset></v-divider>

    <v-col sm="3">
      <v-select
        v-model="value"
        v-on:change="changeHandler"
        :items="items"
        attach
        chips
        label="Equipements"
        multiple
      ></v-select>
    </v-col>
    <v-divider class="mx-4" vertical inset></v-divider>
    <div>Capacité :</div>
    <v-col sm="2">
      <v-slider
        v-model="slider"
        v-on:change="changeHandler"
        class="align-center"
        :max="max"
        :min="min"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="slider"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 40px"
          ></v-text-field>
        </template>
      </v-slider>
    </v-col>
  </v-toolbar>
</template>
<script>
import { minDay, today, hh, nextDayTime } from "../../util/handleTime";

export default {
  data: () => ({
    min: 1,
    max: 50,
    slider: 1, //capacity by default
    items: ["Retro Projecteur", "TV"],
    value: [],
    chosenDate: minDay,
    chosenStartTime: nextDayTime ? 8 : hh,
    chosenEndTime: nextDayTime ? 9 : hh + 1,
    today,
    hh: hh - 1,
    minDay,
  }),
  methods: {
    //Pass any change in the ControlBar variables to the Free Component in order to use them to show the free rooms
    changeHandler: function () {
      
      this.$emit(
        "changeHandler",
        this.slider,
        this.value,
        this.chosenDate,
        parseInt(this.chosenStartTime),
        parseInt(this.chosenEndTime)
      );
    },
  },
};
</script>
<style lang="css" scoped>
.search-icon {
  margin: 0 auto !important;
  cursor: pointer;
}
input {
  color: white;
}
label {
  margin: auto 1em;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px 20px;
}
</style>