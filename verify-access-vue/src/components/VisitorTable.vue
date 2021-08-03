<template>
  <div class="visitor-table items-center mx-auto mb-4">
    <div class="mt-4">
      <input
        type="text"
        id="searchString"
        name="searchString"
        v-model="searchString"
        class="border-solid border-black border-2"
        placeholder="Search for visitor name"
        required
      />
      <Button text="Search" v-on:click="search"></Button>
    </div>
    <table class="styled-table table-auto mt-8 mx-auto">
      <thead>
        <tr class="text-center">
          <th class="w-96 text-center" @click="sortTable('visitorName')">
            Visitor Name
          </th>
          <th class="w-32" @click="sortTable('maskedId')">Masked ID</th>
          <th class="w-40" @click="sortTable('mobileNo')">Contact Number</th>
          <th class="w-40" @click="sortTable('vehiclePlate')">Vehicle Plate</th>
          <th class="w-40" @click="sortTable('visitingUnit')">Visiting Unit</th>
          <th class="w-40" @click="sortTable('purposeOfVisit')">
            Purpose of Visit
          </th>
          <th class="w-40" @click="sortTable('accessPass')">Access Pass</th>
          <th class="w-40" @click="sortTable('entryTime')">Entry Time</th>
          <th class="w-40" @click="sortTable('exitTime')">Exit Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="h-24"
          v-for="visitorRecord in sortedRecords"
          :key="visitorRecord.id"
        >
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
              class="w-28 h-16"
              :text="buttonText"
              v-on:click="checkOutVisitor(visitorRecord)"
            ></Button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="hasPagination" class="mt-4 space-x-4">
      <Button class="w-36" text="Previous" v-on:click="prevPage()"></Button>
      <Button class="w-36" text="Next" v-on:click="nextPage()"></Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Button from "../components/Button.vue";

export default {
  name: "VisitorTable",
  components: { Button },
  props: {
    records: Array,
  },
  data: function () {
    return {
      buttonText: "Check Out",
      currColumnSort: "visitorName",
      isSortAsc: true,
      pageSize: 5,
      currentPage: 1,
      visitorRecords: [],
      sortedRecords: [],
      hasPagination: false,
      searchString: "",
    };
  },
  mounted() {
    console.log(this.records);
    if (this.records.length > this.pageSize) this.hasPagination = true;
    this.visitorRecords = this.records;
    this.sortTable("entryTime");
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
    sortTable(column) {
      this.currentPage = 1;
      if (this.currColumnSort === column) {
        this.isSortAsc = !this.isSortAsc;
      }
      var modifier = 1;
      if (!this.isSortAsc) modifier = -1;
      this.visitorRecords.sort((a, b) => {
        if (a[column] < b[column]) return modifier * -1;
        if (a[column] > b[column]) return modifier * 1;
        if (a[column] === undefined) return modifier * 1;
        if (b[column] === undefined) return modifier * -1;
        return a.idx - b.idx;
      });
      this.currColumnSort = column;
      this.sortedRecords = this.visitorRecords.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
    search() {
      this.sortedRecords = this.visitorRecords.filter((c) => {
        if (this.searchString == "") return true;
        return (
          c.visitorName
            .toLowerCase()
            .indexOf(this.searchString.toLowerCase()) >= 0
        );
      });
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.visitorRecords.length)
        this.currentPage++;
      this.sortedRecords = this.visitorRecords.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      this.sortedRecords = this.visitorRecords.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
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
