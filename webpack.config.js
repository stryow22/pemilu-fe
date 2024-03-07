const path = require('path');

module.exports = {
  entry: './src/index.js', // Masukkan file utama aplikasi React di sini
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "url": require.resolve("url"),
    }
  }  
};

