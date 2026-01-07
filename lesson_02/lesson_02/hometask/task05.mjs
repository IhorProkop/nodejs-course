import { createServer } from "node:http";
import { readFile, writeFile, appendFile } from "node:fs/promises";

const PORT = 3000;

async function readJSONFile(filePath) {
  if (!filePath) return {};

  try {
    const raw = await readFile(filePath, "utf-8");

    if (!raw.trim()) return {};

    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return {};
    throw err;
  }
}

async function writeJSONFile(filePath, dataObj) {
  await writeFile(filePath, JSON.stringify(dataObj, null, 2), "utf-8");
}

async function addDataToJSONFIle(filePath, route) {
  const dataObj = await readJSONFile(filePath);
  if (route in dataObj) dataObj[route]++;
  else dataObj[route] = 1;
  await writeJSONFile(filePath, dataObj);
}

const historySettings = "settings.json";

const server = createServer(async (req, res) => {
  try {
    const settings = await readJSONFile(historySettings);
    const historyFilePath = settings.historyFilePath;
    const historyRoute = settings.historyRoute;

    const url = new URL(req.url, `http://localhost:${PORT}`).pathname;

    if (url === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }

    if (url === historyRoute) {
      res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
      return res.end(`Current ${await readFile(historyFilePath, "utf-8")}`);
    }

    console.log(url);

    await addDataToJSONFIle(historyFilePath, url);

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Server is running...");
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found!");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
