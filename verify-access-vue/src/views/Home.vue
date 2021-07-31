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
    <SingPass />
  </div>
</template>

<script>
import axios from "axios";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import SingPass from "../components/SingPass";

export default {
  name: "Home",
  components: {
    VueQrcode,
    SingPass,
  },
  data: function () {
    return {
      facilityName: "Maple Building",
      qrCodeValue: "test",
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
  created() {
    axios
      .get("api/my-info/generate-qrcode", {
        headers: {
          state: this.facilityName.replace(/\s/g, "+"),
        },
      })
      .then((response) => (this.qrCodeValue = response.data))
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
