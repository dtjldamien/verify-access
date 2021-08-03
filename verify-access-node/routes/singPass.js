const { Router } = require("express");
const axios = require("axios");

const router = Router();

// retrieve list of mock person data from MyInfo sandbox
router.get("/personas", async (req, res) => {
  try {
    axios({
      method: "get",
      url: "https://sandbox.api.myinfo.gov.sg/com/v3/person-sample-usage/dpp",
      responseType: "json",
    })
      .then(function (response) {
        res.status(200).json(response.data.Items);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
