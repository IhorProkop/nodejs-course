import { createServer } from "node:http";

import { getUrl, getPositionName } from "./User.mjs";

const server = createServer((req, res) => {
  const url = getUrl(req.url);

  const positionName = getPositionName(url);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`
    Current URL: ${url}
    \n
    Employee name: ${positionName}`);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
