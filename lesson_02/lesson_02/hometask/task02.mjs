import { createServer } from "node:http";
import { readFile, appendFile, unlink } from "node:fs/promises";

const PORT = 3000;

const pathName = "numbers.txt";

async function readNumFile(filePath) {
  let rawData = "";

  try {
    rawData = await readFile(filePath, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }

  const numsList = rawData
    .split(",")
    .map((el) => el.trim())
    .filter((el) => el !== "")
    .map((el) => Number(el));

  if (numsList.length === 0) return [];

  const bad = numsList.find((n) => !Number.isFinite(n));

  if (bad !== undefined) {
    return { error: `There is a bad number in ${filePath}: ${bad}.` };
  }

  return numsList;
}

function sumNums(numsObj) {
  return numsObj.reduce((acc, num) => acc + num, 0);
}

function multNums(numsObj) {
  return numsObj.reduce((acc, num) => acc * num, 1);
}

async function saveNum(filePath, arg) {
  const num = Number(arg);

  if (!Number.isFinite(num)) {
    throw new Error("You`re only allowed to save numbers.");
  }

  await appendFile(filePath, `${num}, `, "utf-8");
}

async function deleteFile(filePath) {
  try {
    await unlink(filePath);
    return "File has been successfully deleted.";
  } catch (err) {
    if (err.code === "ENOENT") {
      return "File not found.";
    }
    return err;
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`).pathname;
    const [route, param] = url.split("/").filter(Boolean);

    if (!route) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "Routes:\n" +
          "/save_num/<number>\n" +
          "/sum\n" +
          "/mult\n" +
          "/remove\n"
      );
    }

    if (route === "save_num") {
      if (param === undefined) {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Bad request: number is required. Example: /save_num/40");
      }

      await saveNum(pathName, param);
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      return res.end(
        `Number has been saved.\nCurrent numbers: ${await readFile(pathName)}`
      );
    }

    if (route === "sum") {
      const nums = await readNumFile(pathName);

      if (nums.length === 0) {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("The file is empty. There are no numbers to sum.");
      }

      const sum = sumNums(nums);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Sum of numbers: ${sum}`);
    }

    if (route === "mult") {
      const nums = await readNumFile(pathName);

      if (nums.length === 0) {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("The file is empty. There are no numbers to multiply.");
      }

      const product = multNums(nums);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Product of numbers: ${product}`);
    }

    if (route === "remove") {
      const msg = await deleteFile(pathName);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(msg);
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`Server error: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:3000/`);
});
