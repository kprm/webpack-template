const path = require('path');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};

const fileLoader = (outputPath, name, ext) => {
  const loaders = [{
    loader: 'file-loader',
    options: {
      context: path.resolve(__dirname, '../src/'),
      name: name,
      outputPath: outputPath ? outputPath : undefined
    }
  }];
  if (ext) {
    loaders.push(ext);
  }
  return loaders;
};

module.exports = {
  // devtool: 'source-map',
  entry: {
    bundle: PATHS.src + '/index.js'
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[hash:7].js'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'pug': path.resolve(__dirname, '../src/pug'),
      'icons': path.resolve(__dirname, '../src/images/icons'),
      'images': path.resolve(__dirname, '../src/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          query: {}
        }
      },
      {
        test: /\.(mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: fileLoader('media/', '[hash].[ext]')
      },
      {
        test: /\.(woff|woff2)$/,
        use: fileLoader(null, '[path][name].[ext]')
      },
      {
        test: /\.svg$/,
        // exclude: path.resolve(__dirname, '../src/images/icons/'),
        use: fileLoader('images/', '[name].[ext]', 'svg-transform-loader')
      }
    ]
  }
};

