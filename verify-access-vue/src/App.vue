<template>
  <div class="flex flex-row">
    <Sidebar :facilityName="facilityName" :sideBarItems="sideBarItems" />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: { Sidebar },
  data: function () {
    return {
      facilityName: "Maple Building",
      sideBarItems: [
        {
          pageName: "Check In Visitor",
          pageLink: "/",
        },
        {
          pageName: "View List of Current Visitors",
          pageLink: "/current-visitors",
        },
        {
          pageName: "View Visitor History",
          pageLink: "/visitor-history",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
