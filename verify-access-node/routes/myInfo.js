const { Router } = require("express");
const moment = require("moment");
var MyInfoConnector = require("myinfo-connector-nodejs");
const crypto = require("crypto");

const { APP_CONFIG, MYINFO_CONNECTOR_CONFIG } = require("../config");
const qrCodeGenerator = require("../util/qrCodeGeneration.js");

const router = Router();

var SSE = require("express-sse");
var sse = new SSE();
var qrCodeURL;

// a simple channel to allow front-end to connect to the server
router.get("/stream", sse.init);

// Callback to allow SPM send the Auth Code
router.get("/callback", function (req, res) {
  try {
    //retrieve myinfo data if auth code received
    //ensure code and state are returned
    console.log(
      "Send Auth Code to Registered callback:" + JSON.stringify(req.query)
    );
    if (req.query && req.query.code && req.query.state) {
      //Recommendation : Check that state returned from callback matches original QR Code from client
      let txnNo = crypto.randomBytes(10).toString("hex");
      getPersonData(req.query.code, req.query.state, txnNo, res);
    } else {
      res.status(401).send({
        code: 401,
        message: "Unauthorised",
      });
    }
    //sse.send(data.identity, data.state.value);
  } catch (error) {
    console.log("VMS - Error:", error);
  }
});

//mock QR Code generation to display on VMS Client
router.get("/generate-qrcode", function (req, res) {
  var qrCodeParams = getQRCodeParams(req.headers.state);
  qrCodeGenerator
    .generateQRCode(
      qrCodeParams.qrType,
      qrCodeParams.callbackURL,
      qrCodeParams.clientId,
      qrCodeParams.state,
      qrCodeParams.nonce,
      qrCodeParams.signatureMethod,
      qrCodeParams.timeStampEnd,
      qrCodeParams.timeStampStart,
      qrCodeParams.version
    )
    .then(
      (generatedQR) => {
        qrCodeURL = generatedQR;
        res.send(qrCodeURL);
      },
      (error) => {
        res.sendStatus(500);
      }
    );
});

app.get("/qrcode", function (req, res) {
  res.send(qrCodeURL);
});

//mock function to restart the application to facilitate smoother testing
router.get("/restartApplication", function (req, res) {
  res.sendStatus(200);
  sse.send(true, "restartApplication");
});

var getQRCodeParams = function (state) {
  //set the start and end time stamp for qr code
  let timeStampStart = moment(); //QR code start timestamp (UNIX epoch time in milliseconds)
  let timeStampEnd = moment().add(10, "minutes"); //QR code expiry timestamp (UNIX epoch time in milliseconds)

  /* Dynamic QR ( nonce is mandatory, can only use once) */
  let qrCodeParams = {
    qrType: "dynamic",
    callbackURL: APP_CONFIG.VERIFY_ACCESS_CALLBACK_URL,
    clientId: APP_CONFIG.VERIFY_ACCESS_CALLBACK_URL_CLIENT_ID,
    nonce: crypto.randomBytes(20).toString("hex"), // Unique randomly generated text used for replay prevention
    signatureMethod: "RS256",
    version: "2",
    state: state,
    timeStampStart: timeStampStart,
    timeStampEnd: timeStampEnd,
  };

  return qrCodeParams;
};

var getPersonData = function (authCode, state, txnNo, res) {
  // calling myInfo Connector libary to handle Token & Person APIs call
  let connector = new MyInfoConnector(MYINFO_CONNECTOR_CONFIG);
  console.log("Calling MyInfo NodeJs Library...".green);

  connector
    .getMyInfoPersonData(authCode, state, txnNo)
    .then((data) => {
      console.log("--- Sending Person Data From Backend to Frontend---:".green);
      console.log(JSON.stringify(data));
      //callback to your sample app callback
      sse.send(data, state);
      //return success
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("---MyInfo NodeJs Library Error---".red);
      console.log(error);
      sse.send(error);
      res.sendStatus(500);
    });
};

module.exports = router;
