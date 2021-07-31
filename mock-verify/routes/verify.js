const { Router } = require("express");

const requestHandler = require("../util/requestHandler.js");

const router = Router();

router.get("/authorise", function (req, res) {
  var data = req.query;
  var qrCodeUrl = data.qrCodeUrl;
  var token = JSON.parse(data.token).id_token;
  getAuthCode(token, qrCodeUrl)
    .then((authCodeResult) => {
      res.send(authCodeResult);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode).send(error.msg.error);
    });
});

var getAuthCode = function (mockPassToken, qrCodeUrl) {
  var request = {
    domain: "sandbox.api.myinfo.gov.sg",
    requestPath:
      "/sgverify/v2/authorise?qrcodeurl=" + encodeURIComponent(qrCodeUrl),
    headers: {
      Authorization: "Bearer " + mockPassToken,
    },
    method: "GET",
  };
  return requestHandler.getHttpsResponse(
    request.domain,
    request.requestPath,
    request.headers,
    request.method,
    ""
  );
};

module.exports = router;
