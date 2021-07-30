<template>
  <div
    class="
      border-solid border-r-4 border-gray-900
      duration-700
      overflow-hidden
      flex
      justify-center
      w-64
      h-screen
    "
  >
    <div class="flex flex-col items-start content-start">
      <div
        class="
          text-center
          font-bold
          text-xl
          border-solid border-b-4 border-gray-900
          py-8
        "
      >
        Verify Access at {{ facilityName }}
      </div>
      <SidebarItem
        v-for="sideBarItem in sideBarItems"
        :key="sideBarItem.pageName"
        :pageName="sideBarItem.pageName"
        :pageLink="sideBarItem.pageLink"
        class="mx-auto my-2"
      />
    </div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    facilityName: String,
    sideBarItems: Array,
  },
};
</script>

<style scoped></style>
