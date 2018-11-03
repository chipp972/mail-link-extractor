const withESLint = require('next-eslint');

module.exports = withESLint({
  distDir: '.dist',
  exportPathMap: async () => ({
    '/': { page: '/index', query: { test: 'haha' } },
    '/index': { page: '/index', query: { test: 'haha' } },
  }),
});
