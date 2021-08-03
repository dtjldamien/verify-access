<template>
  <button
    class="
      text-base
      font-semibold
      rounded-xl
      px-6
      py-2
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
