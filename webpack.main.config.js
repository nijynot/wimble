const path = require('path');

module.exports = {
  entry: {
    main: './src/main/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './../../dist/',
    filename: '[name].js',
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/renderer/views/components'),
      'hooks': path.resolve(__dirname, 'src/renderer/views/hooks'),
      'artifacts': path.resolve(__dirname, 'artifacts'),
      'svg': path.resolve(__dirname, 'src/renderer/views/svg'),
      'pages': path.resolve(__dirname, 'src/renderer/views/pages'),
      'utils': path.resolve(__dirname, 'src/renderer/utils'),
      'bin': path.resolve(__dirname, 'bin'),
      'client': path.resolve(__dirname, 'src/client'),
      'commands': path.resolve(__dirname, 'src/commands'),
      'contexts': path.resolve(__dirname, 'src/renderer/views/contexts'),
    },
  }
};
