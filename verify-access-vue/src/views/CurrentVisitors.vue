<template>
  <div class="current-visitors items-center mx-auto">
    <h1 class="text-center font-bold text-5xl mt-8">Current Visitors</h1>
    <VisitorTable v-if="dataLoaded" :records="visitorRecords" />
  </div>
</template>

<script>
import axios from "axios";
import VisitorTable from "../components/VisitorTable";

export default {
  name: "CurrentVisitors",
  components: { VisitorTable },
  data: function () {
    return {
      visitorRecords: [],
      dataLoaded: false,
    };
  },
  mounted() {
    axios
      .get("api/visitor-records")
      .then((response) => {
        this.visitorRecords = response.data;
        this.dataLoaded = true;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
