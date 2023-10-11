const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/vacancy',
        createProxyMiddleware({
            target: 'https://express-shina.ru',
            changeOrigin: true,
        })
    );
};
