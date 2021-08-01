<template>
  <div class="singpass">
    <h1>singpass</h1>
    <select v-model="selectedPersona">
      <option
        v-for="persona in personas"
        :key="persona.uinfin"
        v-bind:value="persona.uinfin"
      >
        {{ persona.name }}
      </option>
    </select>
    <Button :text="buttonText" v-on:click="scanQr(selectedPersona)"></Button>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  name: "SingPass",
  components: { Button },
  data: function () {
    return {
      tokenResult: "default",
      personas: [],
      selectedPersona: "",
      buttonText: "Scan QR",
    };
  },
  methods: {
    scanQr(selectedPersona) {
      // axios
      //   .get("singpass/authorise", {
      //     body: JSON.stringify({
      //       selectedUinfin: selectedPersona.selectedUinfin,
      //     }),
      //   })
      //   .then((response) => console.log(response.data))
      //   .catch((error) => {
      //     this.errorMessage = error.message;
      //     console.error("There was an error!", error);
      //   });
      console.log(selectedPersona);
      this.$router.push({
        name: "EntryForm",
        params: {
          visitorName: "CHENG MEI QIN",
          maskedId: "365F",
          mobileNo: "94891038",
          vehiclePlate: "SLN584U",
        },
      });
    },
  },
  mounted() {
    axios
      .get("singpass/personas")
      .then((response) => (this.personas = response.data))
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
