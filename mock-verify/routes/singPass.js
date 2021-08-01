const { Router } = require("express");
const axios = require("axios");

const router = Router();

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

router.get("/authorise", function (req, res) {
  let tokenResult;
  var selectedUinfin = req.body.selectedUinfin;
  getMockPassToken(selectedUinfin)
    .then((result) => {
      tokenResult = result;
      return getMockQRCode();
    })
    .then((result) => {
      const data = result.data;
      let urlParams = data.split("&");
      urlParams.forEach((element) => {
        if (element.indexOf("client_id") >= 0) {
          clientId = element.split("=")[1];
        } else if (element.indexOf("state") >= 0) {
          state = element.split("=")[1];
        }
      });
      return callAuthorise(tokenResult.data.id_token, data);
    })
    .then((result) => {
      console.log(result);
      const data = result.data;
      authResult = JSON.parse(data);
      res.jsonp(authResult);
    })
    .catch((error) => {
      console.log(error);
      console.log(
        "Unable to retrieve profile details, please try another profile..."
          .yellow
      );
      res.status(error.statusCode).send(error.msg.error);
    });
});

var getMockPassToken = function (selectedUinfin) {
  var type = "JWS";
  var request = {
    domain: "https://test.api.myinfo.gov.sg",
    requestPath: "/mockpass-sp/mock-id-token/",
    headers: {},
    method: "GET",
  };
  let requestPath =
    request.domain + request.requestPath + selectedUinfin + "?type=" + type;
  return axios({
    method: "get",
    url: requestPath,
    responseType: "json",
  });
};

var getMockQRCode = function () {
  return axios({
    method: "get",
    url: "http://localhost:3000/api/my-info/qrcode",
    responseType: "json",
  });
};

var callAuthorise = function (token, qrCodeUrl) {
  getAuthCode(token, qrCodeUrl)
    .then((authCodeResult) => {
      console.log(authCodeResult);
      return authCodeResult;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

var getAuthCode = function (mockPassToken, qrCodeUrl) {
  const url =
    "https://sandbox.api.myinfo.gov.sg/sgverify/v2/authorise?qrcodeurl=" +
    encodeURIComponent(qrCodeUrl);
  return axios({
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer " + mockPassToken,
    },
    responseType: "json",
  });
};

module.exports = router;
