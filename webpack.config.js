const path = require('path');

module.exports = {
  resolve: {
    fallback: {
        "http": require.resolve("stream-http"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "stream": require.resolve("stream-browserify")
    },
  },
};
