const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const host = req.headers.host;
  const cookies = req.headers.cookie;
  if (host === "k24a1.fleepy.tv") {
    const urlObj = url.parse(req.url);
    const path = urlObj.pathname;
    const headers = {
      ...req.headers,
      "Host": "k24a1.42web.io",
    }
    headers.cookie = cookies + "; __test=325c6b5dfce19c75b820329c6056d1ea";
    headers.host = "k24a1.42web.io";

    // http.request
    const options = {
      host: "k24a1.42web.io",
      port: 80,
      path: path,
      method: req.method,
      headers: headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      Object.keys(proxyRes.headers).forEach((key) => {
        res.setHeader(key, proxyRes.headers[key]);
      });
      proxyRes.pipe(res);
    });

    proxyReq.setHeader("host","k24a1.fleepy.tv");

    req.pipe(proxyReq);
    // fetch
    // fetch({
    //   "url": "http://185.27.134.133/" + path,
    //   "headers": headers
    // }).then(function(response) {
    //   res.writeHead(response.status, {
    //     ...response.headers,
    //   });
    //   res.end(response);
    // }).catch(function(err) {
    //   res.writeHead(response.status, {
    //     ...response.headers,
    //   });
    //   res.end(response);
    // });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8089);
        