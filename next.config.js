const withESLint = require('next-eslint');

module.exports = withESLint({
  distDir: '../.dist/front',
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/index', query: { test: 'haha' } },
      '/index': { page: '/index', query: { test: 'haha' } },
    };
  },
});
