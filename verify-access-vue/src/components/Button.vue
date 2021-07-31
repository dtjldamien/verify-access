<template>
  <button
    class="
      text-base
      font-semibold
      rounded-3xl
      px-8.5
      py-3
      bg-blue-900
      hover:bg-green-900
      text-white
    "
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: "TEXT HERE",
    },
  },
};
</script>

<style scoped lang="scss"></style>
