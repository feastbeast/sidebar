const webpack = require('webpack');
const path = require('path');

var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const common = {
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('http://54.245.78.41:3001')
    })
  ],
  
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [ 'style-loader', 'css-loader' ]
      // }
    ]
  },
  // resolve: { 
  //   alias: { 
  //     'react': path.resolve(__dirname, 'node_modules', 'react') 
  // } }
};

const client = {
  entry: `${SRC_DIR}/client.js`,
  output: {
    filename: 'sidebar.js',
    path: DIST_DIR
  }
};  

const server = {
  target: 'node',
  entry: `${SRC_DIR}/server.js`,
  output: {
    filename: 'sidebar-server.js',
    path: DIST_DIR,
    libraryTarget: 'commonjs-module'
  }
}; 

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];
