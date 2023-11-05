// import { createProxyMiddleware } from "http-proxy-middleware";

// export default function configureApiProxy(app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//       changeOrigin: true,
//     })
//   );
// }

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", //추가
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
