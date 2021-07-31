module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "^/api": {
          target: process.env.VUE_APP_DEV_SERVER_TARGET,
          changeOrigin: true,
        },
        "^/mock-verify": {
          target: process.env.VUE_APP_MOCK_VERIFY_TARGET,
          changeOrigin: true,
        },
        "^/my-info-sandbox": {
          target: "https://sandbox.api.myinfo.gov.sg",
          changeOrigin: true,
        },
      },
    },
  },
};
