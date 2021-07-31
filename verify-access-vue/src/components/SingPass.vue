<template>
  <div class="singpass">
    <h1>singpass</h1>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Visitor Name</th>
          <th>Masked ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitorRecord in personas" :key="visitorRecord.uinfin">
          <td>{{ visitorRecord.name }}</td>
          <td>{{ visitorRecord.uinfin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingPass",
  data: function () {
    return {
      tokenResult: "default",
      personas: [],
    };
  },
  mounted() {
    axios
      .get("my-info-sandbox/com/v3/person-sample-usage/dpp")
      .then((response) => console.log(response.data))
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });

    axios
      .get("mock-verify/authorise")
      .then((response) => console.log(response.data))
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
