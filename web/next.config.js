const { resolve } = require('path');
const webpack = require('webpack');
const withESLint = require('next-eslint');
const { parsed: localEnv } = require('dotenv').config({ path: resolve(__dirname, '..', '.env') });

module.exports = withESLint({
  distDir: '.dist',
  exportPathMap: async () => ({
    '/': { page: '/index', query: { test: 'haha' } },
    '/index': { page: '/index', query: { test: 'haha' } },
  }),
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
});
