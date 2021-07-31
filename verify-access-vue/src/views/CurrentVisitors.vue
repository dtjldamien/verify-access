<template>
  <div class="current-visitors">
    <h1>current visitors page</h1>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Visitor Name</th>
          <th>Masked ID</th>
          <th>Contact Number</th>
          <th>Visiting Unit</th>
          <th>Vehicle Plate</th>
          <th>Access Pass</th>
          <th>Entry Time</th>
          <th>Exit Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitorRecord in visitorRecords" :key="visitorRecord.id">
          <td>{{ visitorRecord.visitorName }}</td>
          <td>{{ visitorRecord.maskedId }}</td>
          <td>{{ visitorRecord.maskedId }}</td>
          <td>{{ visitorRecord.vehiclePlate }}</td>
          <td>{{ visitorRecord.visitingUnit }}</td>
          <td>{{ visitorRecord.purposeOfVisit }}</td>
          <td>{{ visitorRecord.accessPass }}</td>
          <td>{{ visitorRecord.entryTime }}</td>
          <td>
            <p v-if="visitorRecord.exitTime != null">
              {{ visitorRecord.exitTime }}
            </p>
            <Button
              v-else
              :text="buttonText"
              v-on:click="checkOutVisitor(visitorRecord)"
            ></Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  name: "CurrentVisitors",
  components: { Button },
  data: function () {
    return {
      visitorRecords: [],
      buttonText: "Check Out",
    };
  },
  mounted() {
    axios
      .get("api/visitor-records")
      .then((response) => (this.visitorRecords = response.data))
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
  methods: {
    checkOutVisitor(visitorRecord) {
      axios
        .patch("api/visitor-records/" + visitorRecord._id)
        .then((response) => (visitorRecord.exitTime = response.data.exitTime))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
