<template>
  <div class="current-visitors">
    <h1 class="text-center font-bold text-5xl mt-8">Visitor Entry Form</h1>
    <form class="mt-8">
      <label for="visitorName">Visitor Name:</label><br />
      <input
        type="text"
        id="visitorName"
        name="visitorName"
        :value="visitorName"
        readonly
      /><br />
      <label for="maskedId">ID:</label><br />
      <input
        type="text"
        id="maskedId"
        name="maskedId"
        :value="maskedId"
        readonly
      /><br />
      <label for="mobileNo">Mobile Number:</label><br />
      <input
        type="text"
        id="mobileNo"
        name="mobileNo"
        :value="mobileNo"
        readonly
      /><br />
      <label for="vehiclePlate">Vehicle Plate:</label><br />
      <input
        type="text"
        id="vehiclePlate"
        name="vehiclePlate"
        :value="vehiclePlate"
      /><br />
      <label for="visitingUnit">Visiting Unit:</label><br />
      <input
        type="text"
        id="visitingUnit"
        name="visitingUnit"
        v-model="visitingUnit"
        required
      /><br />
      <label for="purposeOfVisit">Purpose of Visit:</label><br />
      <input
        type="text"
        id="purposeOfVisit"
        name="purposeOfVisit"
        v-model="purposeOfVisit"
        required
      /><br />
      <label for="accessPass">Access Pass:</label><br />
      <input
        type="text"
        id="accessPass"
        name="accessPass"
        v-model="accessPass"
      /><br />
      <input
        class="
          text-base
          font-semibold
          rounded-3xl
          px-8
          py-3
          bg-blue-900
          hover:bg-green-900
          text-white
          border-0
        "
        type="submit"
        value="Submit"
        v-on:click="checkInVisitor"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EntryForm",
  props: {
    visitorName: {
      type: String,
    },
    maskedId: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    vehiclePlate: {
      type: String,
    },
  },
  data: function () {
    return {
      visitingUnit: "",
      purposeOfVisit: "",
      accessPass: "",
    };
  },
  methods: {
    checkInVisitor() {
      axios
        .post("api/visitor-records", {
          visitorName: this.visitorName,
          maskedId: this.maskedId,
          mobileNo: this.mobileNo,
          vehiclePlate: this.vehiclePlate,
          visitingUnit: this.visitingUnit,
          purposeOfVisit: this.purposeOfVisit,
          accessPass: this.accessPass,
          entryTime: Date.now(),
        })
        .then(
          this.$router.push({
            path: "/current-visitors",
          })
        )
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>
label {
  text-align: left;
}

input {
  border-style: solid;
  border-width: 2px;
  border-color: black;
}

.required {
  content: " *";
  color: red;
}

input[type="text"]:read-only {
  cursor: normal;
  background-color: #f8f8f8;
  color: #999;
}
</style>
