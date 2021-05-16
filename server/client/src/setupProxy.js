const proxyServer = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxyServer.createProxyMiddleware('/users/*', { target: 'http://localhost:8000' }));
};