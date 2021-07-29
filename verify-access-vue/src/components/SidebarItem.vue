<template>
  <div>
      <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    name: String,
  },
};
</script>

<style scoped></style>
