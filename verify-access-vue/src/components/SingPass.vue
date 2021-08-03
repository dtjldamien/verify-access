<template>
  <div v-if="isPersonasLoaded" class="singpass">
    <h1 class="text-5xl mb-4">SingPass</h1>
    <select
      class="h-12 border-solid border-2 border-black"
      v-model="selectedPersona"
    >
      <option
        v-for="persona in personas"
        :key="persona.uinfin"
        v-bind:value="persona"
      >
        {{ persona.name }}
      </option>
    </select>
    <Button
      class="mx-2"
      :text="buttonText"
      v-on:click="scanQr(selectedPersona)"
    ></Button>
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
      isPersonasLoaded: false,
    };
  },
  methods: {
    scanQr(selectedPersona) {
      this.$router.push({
        name: "EntryForm",
        params: {
          visitorName: selectedPersona.name,
          maskedId: selectedPersona.value.partialuinfin.value,
          mobileNo: selectedPersona.value.mobileno.nbr.value,
          vehiclePlate:
            selectedPersona.value.vehicles.length > 0
              ? selectedPersona.value.vehicles[0].vehicleno.value
              : "",
        },
      });
    },
  },
  mounted() {
    axios
      .get("api/singpass/personas")
      .then((response) => {
        this.personas = response.data;
        this.isPersonasLoaded = true;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
