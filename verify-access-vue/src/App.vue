<template>
  <div class="container">
    <Sidebar :facilityName="facilityName" :sideBarItems="sideBarItems" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: { Sidebar },
  data: function() {
    return {
      facilityName: "Maple Building",
      sideBarItems: [
        {
          name: "Check In Visitor",
        },
        {
          name: "View List of Current Visitors",
        },
        {
          name: "View Visitor History",
        },
      ],
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap");
</style>
