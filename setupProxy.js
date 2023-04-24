const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/data.json',
    createProxyMiddleware({
      target: 'https://master--standardised-meal-plan-data.netlify.app',
      changeOrigin: true,
      pathRewrite: {
        '^/data.json': '',
      },
    }),
  );
};
