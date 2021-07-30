<template>
  <div>
    <router-link :to="getURL(pageLink)">{{ pageName }}</router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    pageName: { type: String, default: "Check In Visitor" },
    pageLink: { type: String, default: "/" },
  },
  methods: {
    getURL(pageLink) {
      return pageLink;
    },
  },
};
</script>

<style scoped>
.router-link-active {
  color: red;
}
</style>
