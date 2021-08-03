<template>
  <div class="current-visitors">
    <h1 class="text-center font-bold text-5xl mt-8">Visitor Entry Form</h1>
    <div v-if="errors.length" class="mt-4 text-red-600">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
    <form class="mt-4">
      <label for="visitorName">Visitor Name:</label><br />
      <input
        type="text"
        id="visitorName"
        name="visitorName"
        :value="visitorName"
        required
        readonly
      /><br />
      <label for="maskedId">ID:</label><br />
      <input
        type="text"
        id="maskedId"
        name="maskedId"
        :value="maskedId"
        required
        readonly
      /><br />
      <label for="mobileNo">Mobile Number:</label><br />
      <input
        type="text"
        id="mobileNo"
        name="mobileNo"
        v-model="updatedMobileNo"
        required
      /><br />
      <label for="vehiclePlate">Vehicle Plate:</label><br />
      <input
        type="text"
        id="vehiclePlate"
        name="vehiclePlate"
        v-model="updatedVehiclePlate"
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
        required
      /><br />
      <input
        class="
          mt-8
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
      updatedMobileNo: this.mobileNo,
      updatedVehiclePlate: this.vehiclePlate,
      visitingUnit: "",
      purposeOfVisit: "",
      accessPass: "",
      errors: [],
    };
  },
  methods: {
    isEmptyString(str) {
      return !str || str.length === 0;
    },
    checkInVisitor() {
      if (
        !this.isEmptyString(this.visitorName) &&
        !this.isEmptyString(this.maskedId) &&
        !this.isEmptyString(this.updatedMobileNo) &&
        !this.isEmptyString(this.updatedVehiclePlate) &&
        !this.isEmptyString(this.visitingUnit) &&
        !this.isEmptyString(this.purposeOfVisit) &&
        !this.isEmptyString(this.accessPass)
      ) {
        axios
          .post("api/visitor-records", {
            visitorName: this.visitorName,
            maskedId: this.maskedId,
            mobileNo: this.updatedMobileNo,
            vehiclePlate: this.updatedVehiclePlate,
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
      }
      this.errors = [];
      if (this.isEmptyString(this.visitorName)) {
        this.errors.push("Name required.");
      }
      if (this.isEmptyString(this.maskedId)) {
        this.errors.push("ID required.");
      }
      if (this.isEmptyString(this.updatedMobileNo)) {
        this.errors.push("Mobile number required.");
      }
      if (this.isEmptyString(this.visitingUnit)) {
        this.errors.push("Visiting unit required.");
      }
      if (this.isEmptyString(this.purposeOfVisit)) {
        this.errors.push("Purpose of visit required.");
      }
      if (this.isEmptyString(this.accessPass)) {
        this.errors.push("Access Pass required.");
      }
      if (!this.errors.length) {
        return true;
      }
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
