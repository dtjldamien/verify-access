<template>
  <div class="current-visitors items-center mx-auto">
    <h1 class="text-center font-bold text-5xl mt-8">Current Visitors</h1>
    <table class="styled-table table-auto mt-8 mx-auto">
      <thead>
        <tr>
          <th @click="sort('visitorName')">Visitor Name</th>
          <th @click="sort('maskedId')">Masked ID</th>
          <th @click="sort('mobileNo')">Contact Number</th>
          <th @click="sort('vehiclePlate')">Vehicle Plate</th>
          <th @click="sort('visitingUnit')">Visiting Unit</th>
          <th @click="sort('purposeOfVisit')">Purpose of Visit</th>
          <th @click="sort('accessPass')">Access Pass</th>
          <th @click="sort('entryTime')">Entry Time</th>
          <th @click="sort('exitTIme')">Exit Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitorRecord in visitorRecords" :key="visitorRecord.id">
          <td>{{ visitorRecord.visitorName }}</td>
          <td>{{ visitorRecord.maskedId }}</td>
          <td>{{ visitorRecord.mobileNo }}</td>
          <td>{{ visitorRecord.vehiclePlate }}</td>
          <td>{{ visitorRecord.visitingUnit }}</td>
          <td>{{ visitorRecord.purposeOfVisit }}</td>
          <td>{{ visitorRecord.accessPass }}</td>
          <td>{{ formatDate(visitorRecord.entryTime) }}</td>
          <td>
            <p v-if="visitorRecord.exitTime != null">
              {{ formatDate(visitorRecord.exitTime) }}
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
import moment from "moment";
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
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
    sort(column) {
      if (this.currColumnSort === column) {
        this.isSortAsc = !this.isSortAsc;
      }
      if (this.isSortAsc) {
        this.visitorRecords.sort((a, b) => {
          if (a[column] < b[column]) return -1;
          if (a[column] > b[column]) return 1;
          return a.idx - b.idx;
        });
      } else {
        this.visitorRecords.sort((a, b) => {
          if (a[column] < b[column]) return 1;
          if (a[column] > b[column]) return -1;
          return a.idx - b.idx;
        });
      }
      this.currColumnSort = column;
    },
  },
};
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: thin solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
