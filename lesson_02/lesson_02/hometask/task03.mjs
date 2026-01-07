import { createServer } from "node:http";

const PORT = 3000;

function add(numsList) {
  return numsList.reduce((acc, num) => acc + num, 0);
}

function sub(numsList) {
  return numsList.slice(1).reduce((acc, num) => acc - num, numsList[0]);
}

function mult(numsList) {
  return numsList.reduce((acc, num) => acc * num, 1);
}

function argsToNums(args) {
  const listOfNums = args
    .split("-")
    .map((el) => el.trim())
    .map((el) => Number(el));

  return listOfNums;
}

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`).pathname;

    if (url === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }

    const [operation, args] = url.split("/").filter((el) => Boolean(el));

    if (!operation) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "Example of url: \n/add/11-22-33 to find sum" +
          "\n/mult/11-22-33 to find product" +
          "\n/sub/11-22-33 to find difference."
      );
    }

    const op = operation.toLowerCase();

    if (!args) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("You should hand over numbers as well as operation.");
    }

    const numbers = argsToNums(args);

    if (numbers.some((n) => !Number.isFinite(n))) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("All args must be numbers. Example: /add/12-4-23-45");
    }

    if (op === "add") {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Sum of numbers: ${add(numbers)}`);
    }

    if (op === "mult") {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Product of numbers: ${mult(numbers)}`);
    }

    if (op === "sub") {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Difference of numbers: ${sub(numbers)}`);
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Unknown operation. Use: /add, /sub, /mult");
  } catch (err) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`Error: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
