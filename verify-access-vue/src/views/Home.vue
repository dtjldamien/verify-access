<template>
  <div class="home items-center justify-center mt-8">
    <h1 class="text-center font-bold text-5xl">
      Welcome to {{ facilityName }}
    </h1>
    <div class="mt-8 justify-center">
      <vue-qrcode
        class="justify-center items-center"
        :value="qrCodeValue"
        :options="{ width: 400 }"
      ></vue-qrcode>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  name: "Home",
  components: {
    VueQrcode,
  },
  data: function () {
    return {
      facilityName: "Maple Building",
      qrCodeValue: "test",
      visitorRecords: [],
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
  async mounted() {
    const response = await axios.get("api/my-info/generate-qrcode", {
      headers: {
        state: this.facilityName,
      },
    });
    this.visitorRecords = response.data;
  },
};
</script>
