module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "^/api": {
          target: process.env.VUE_APP_DEV_SERVER_TARGET,
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
        },
      },
    },
  },
};
