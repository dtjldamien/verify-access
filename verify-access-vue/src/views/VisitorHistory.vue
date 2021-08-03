<template>
  <div class="current-visitors items-center mx-auto">
    <h1 class="text-center font-bold text-5xl mt-8">Visitor History</h1>
    <div class="flex flex-row ml-96 mt-4">
      <Button
        v-bind:class="{
          active: activeButton == todayButtonText,
        }"
        :text="todayButtonText"
        v-on:click="getDailyRecords()"
      />
      <Button
        v-bind:class="{
          active: activeButton == weekButtonText,
        }"
        :text="weekButtonText"
        v-on:click="getWeeklyRecords()"
      />
      <Button
        v-bind:class="{
          active: activeButton == allTimeButtonText,
        }"
        :text="allTimeButtonText"
        v-on:click="getAllTimeRecords()"
      />
    </div>
    <VisitorTable v-if="dataLoaded" :records="visitorRecords" />
  </div>
</template>

<script>
import axios from "axios";
import VisitorTable from "../components/VisitorTable";
import Button from "../components/Button.vue";

export default {
  name: "CurrentVisitors",
  components: { VisitorTable, Button },
  data: function () {
    return {
      visitorRecords: [],
      dataLoaded: false,
      todayButtonText: "Today",
      weekButtonText: "Weekly",
      allTimeButtonText: "All Time",
      selectedDateRange: "Today",
      activeButton: "Today",
    };
  },
  mounted() {
    axios
      .get("api/visitor-records/history/daily")
      .then((response) => {
        this.visitorRecords = response.data;
        this.dataLoaded = true;
        this.activeButton = this.todayButtonText;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
  methods: {
    getDailyRecords() {
      this.dataLoaded = false;
      axios
        .get("api/visitor-records/history/daily")
        .then((response) => {
          this.visitorRecords = response.data;
          this.dataLoaded = true;
          this.activeButton = this.todayButtonText;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getWeeklyRecords() {
      this.dataLoaded = false;
      axios
        .get("api/visitor-records/history/weekly")
        .then((response) => {
          this.visitorRecords = response.data;
          this.dataLoaded = true;
          this.activeButton = this.weekButtonText;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getAllTimeRecords() {
      this.dataLoaded = false;
      axios
        .get("api/visitor-records/history")
        .then((response) => {
          this.visitorRecords = response.data;
          this.dataLoaded = true;
          this.activeButton = this.allTimeButtonText;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>
.active {
  background-color: darkcyan;
}
</style>
