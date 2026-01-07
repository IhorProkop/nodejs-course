import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const PORT = 3000;

const allowed = ["index", "coffee", "music"];

const server = createServer(async (req, res) => {
    try {
        const url = new URL(req.url, `http://localhost:${PORT}`).pathname;

        if(url === "/favicon.ico") {
            res.writeHead(200);
            return res.end();
        }

        const page = url === "/" ? "index" : url.slice(1);

        const filePath = `${page}.html`;

        if(!allowed.includes(page)) {
            throw new Error("Not found!");
        }

        const pageData = await readFile(filePath, "utf-8");

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pageData);

    } catch (err) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Not found!");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
