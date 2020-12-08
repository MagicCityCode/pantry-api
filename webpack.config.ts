import { IgnorePlugin } from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

/**
 * @todo Move to .env variable when ready for production
 */
const DEV = true;

const config = {
  entry: './src/server.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      buffer: false,
      crypto: false,
      http: false,
      path: false,
      querystring: false,
      stream: false,
      url: false,
      util: false,
      zlib: false,
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: DEV ? 'development' : 'production',
  externals: [nodeExternals()],
};

export default config;
