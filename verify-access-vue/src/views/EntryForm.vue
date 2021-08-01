<template>
  <div class="current-visitors">
    <h1>entry form page</h1>
    <form>
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
      /><br />
      <label for="purposeOfVisit">Purpose of Visit:</label><br />
      <input
        type="text"
        id="purposeOfVisit"
        name="purposeOfVisit"
        v-model="purposeOfVisit"
      /><br />
      <label for="accessPass">Access Pass:</label><br />
      <input
        type="text"
        id="accessPass"
        name="accessPass"
        v-model="accessPass"
      /><br />
      <input type="submit" value="Submit" v-on:click="checkInVisitor" />
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
      default: "CHENG MEI QIN",
    },
    maskedId: {
      type: String,
      default: "365F",
    },
    mobileNumber: {
      type: String,
      default: "94891038",
    },
    vehiclePlate: {
      type: String,
      default: "SLN584U",
    },
  },
  data: function () {
    return {
      visitingUnit: "default",
      purposeOfVisit: "default",
      accessPass: "default",
    };
  },
  methods: {
    checkInVisitor() {
      axios
        .post("api/visitor-records", {
          visitorName: this.visitorName,
          maskedId: this.maskedId,
          vehiclePlate: this.vehiclePlate,
          visitingUnit: this.visitingUnit,
          purposeOfVisit: this.purposeOfVisit,
          accessPass: this.accessPass,
        })
        .then((response) => (this.articleId = response.data.id))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.$router.push({
        path: "/current-visitors",
      });
    },
  },
};
</script>
