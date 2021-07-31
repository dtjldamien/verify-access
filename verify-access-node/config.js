require("dotenv").config();

let APP_CONFIG = {
  VERIFY_ACCESS_CALLBACK_URL: process.env.VERIFY_ACCESS_CALLBACK_URL,
  VERIFY_ACCESS_CALLBACK_URL_CLIENT_ID: "VERIFY_ACCESS",
  VERIFY_ACCESS_CALLBACK_URL_CLIENT_SECRET:
    process.env.VERIFY_ACCESS_CALLBACK_URL_CLIENT_SECRET,
  CLIENT_SECURE_CERT: process.env.CLIENT_SECURE_CERT,
  CLIENT_SECURE_CERT_PASSPHRASE: process.env.CLIENT_SECURE_CERT_PASSPHRASE,
};

//Set following configuration for MyInfo library to call token and person API
let MYINFO_CONNECTOR_CONFIG = {
  MYINFO_SIGNATURE_CERT_PUBLIC_CERT:
    process.env.MYINFO_SIGNATURE_CERT_PUBLIC_CERT,
  CLIENT_SECURE_CERT: APP_CONFIG.CLIENT_SECURE_CERT,
  CLIENT_SECURE_CERT_PASSPHRASE: APP_CONFIG.CLIENT_SECURE_CERT_PASSPHRASE,

  CLIENT_ID: APP_CONFIG.VERIFY_ACCESS_CALLBACK_URL_CLIENT_ID, //Client id provided during onboarding
  CLIENT_SECRET: APP_CONFIG.VERIFY_ACCESS_CALLBACK_URL_CLIENT_SECRET, //Client secret provided during onboarding
  REDIRECT_URL: APP_CONFIG.VERIFY_ACCESS_CALLBACK_URL, //Redirect URL for web application
  ATTRIBUTES: process.env.MY_INFO_ATTRIBUTES,

  ENVIRONMENT: process.env.MYINFO_CONNECTOR_ENV,
  TOKEN_URL: process.env.MYINFO_CONNECTOR_TOKEN_URL,
  PERSON_URL: process.env.MYINFO_CONNECTOR_PERSON_URL,

  //Proxy parameters (OPTIONAL)
  USE_PROXY: "N", //Indicate whether proxy url is used. i.e. Y or N
  PROXY_TOKEN_URL: "", //Configure your proxy url here, if any.
  PROXY_PERSON_URL: "", //Configure your proxy url here, if any.

  /*
  Debug level for library logging. i.e 'error, info, debug' leave empty to turn off logs (OPTIONAL)
   * error - Log out all the errors returned from the library
   * info - log urls called, authorization headers and errors from the library
   * debug - Full logs from the library, i.e (errors, urls, authorization headers, API response) 
  
  NOTE: debug mode should never be turned on in production
  */
  DEBUG_LEVEL: "debug",
};

MONGO_URI = process.env.MONGO_URI;
PORT = process.env.PORT;

module.exports.APP_CONFIG = APP_CONFIG;
module.exports.MYINFO_CONNECTOR_CONFIG = MYINFO_CONNECTOR_CONFIG;
module.exports.PORT = PORT;
module.exports.MONGO_URI = MONGO_URI;
