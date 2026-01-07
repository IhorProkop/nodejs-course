// console.log(process.argv.slice(2));

// const numbers = process.argv.slice(2).map(num => Number(num));
// console.log(`Numbers: ${numbers}`);

// const sumNumbers = numbers.reduce((acc, num) => acc += num, 0);
// console.log(`Sum: ${sumNumbers}`);

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

// const params = process.argv.slice(2);

// const obj = {};

// for (const element of params) {
//   const pair = element.split("=");
//   obj[pair[0]] = pair[1];
// }

// console.log(obj);

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

// const params = process.argv.slice(2);

// const joinedParams = params.join("&");

// const paramsMap = new URLSearchParams(joinedParams);
// console.log(paramsMap);
// console.log(paramsMap.get("--a"));
// console.log(paramsMap.getAll("--a"));
// console.log(paramsMap.has("--a"));

// Задача. При запуску задається ім'я користувача і кількість секунд, через які треба привітати користувача.

// const params = process.argv.slice(2);
// const joinedParams = params.join("&");
// const paramsMap = new URLSearchParams(joinedParams);

// if(!paramsMap.has("--name") || !paramsMap.has("--seconds")) {
//     console.log("Error:\nUsage: node index.mjs --name=<name> --seconds=<seconds>");
//     process.exit(1);
// }

// const name = paramsMap.get('--name');
// const seconds = Number(paramsMap.get("--seconds"));

// if(!isFinite(seconds) || seconds < 0) {
//     console.log("Error:\nSeconds must be a non-negative finite number");
//     process.exit(1);
// }

// setTimeout(() => {
//     console.log(`Hello, ${name}!`);
// }, seconds * 1000);

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

// import readline from "node:readline"

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question("Your name: ", (name) => {
//     console.log(`Hello, ${name}!`);
//     rl.close();
// })

// =============================================================================================================================================

// import readline from "node:readline"

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.on("line", (age) => {
//   console.log(`Age received by the user: ${age}`);
//   rl.close();
// });

// rl.setPrompt("What is your age? ");
// rl.prompt();

// =============================================================================================================================================

// import readline from "node:readline";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.on("line", (name) => {
//     console.log(`Hello, ${name}!`)
//     rl.close();
// })

// rl.setPrompt("Your name: ");
// rl.prompt();

// rl.on("SIGINT", () => {
//     rl.question("Are you sure you want to exit? (y/n)", (answer) => {
//         const normalizedAnswer = answer.trim().toLowerCase();
//         if(normalizedAnswer === "y" || normalizedAnswer === "yes") {
//             rl.close();
//         } else {
//             rl.prompt();
//         }
//     })
// });

// rl.on("close", () => {
//     console.log("Exiting the program.");
//     process.exit(0);
// })

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

// АСИНХРОННА ВЕРСІЯ
// import { createServer } from "node:http";
// import { readFile } from "node:fs/promises";

// const server = createServer(async (req, res) => {
//     const url = new URL(req.url, `http://localhost:3000`).pathname;
//     const page = url === "/" ? "index" : url.slice(1);
//     const filePath = `${page}.html`;

//     try {
//         const data = await readFile(filePath, "utf-8");
//         res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//         return res.end(data);
//     } catch (err) {
//         res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
//         return res.end(
//           `404 Not Found, the page "http://localhost:3000${url}" does not exist.`
//         );
//     }
// });

// server.listen(3000, () => {
//     console.log("Server running at http://localhost:3000/");
// })

// =============================================================================================================================================

// СИНХРОННА ВЕРСІЯ
// import { createServer } from "node:http";
// import { existsSync, readFileSync} from "node:fs";

// const server = createServer((req, res) => {
//     const url = new URL(req.url, `http://localhost:3000`).pathname;
//     const page = url === "/" ? "index" : url.slice(1);
//     const filePath = `${page}.html`;

//     if (existsSync(filePath)) {
//         const data = readFileSync(filePath, "utf-8");
//         res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//         return res.end(data);
//     } else {
//         res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
//         return res.end(
//           `404 Not Found, the page "http://localhost:3000${url}" does not exist.`
//         );
//     }
// })

// server.listen(3000, () => {
//     console.log("Server running at http://localhost:3000/");
// })

// =============================================================================================================================================

// ASYNC check whether file exists

// import fs from "node:fs";

// const filePath = "test.txt";

// fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//         console.log(`${filePath} does not exist`);
//     } else {
//         console.log(`${filePath} exists`);
//     }
// })

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

/**
 * Node.js cheat-sheet: файли, JSON, потоки, pipe, gzip
 * (коротко і по ділу — що робить, як працює, особливості)
 */

/* =========================
   1) readFile / writeFile / appendFile (fs/promises)
   ========================= */

// import { readFile, writeFile, appendFile } from "node:fs/promises";

/**
 * readFile(path, encoding?)
 * ✅ читає ВЕСЬ файл одразу в памʼять (RAM) і повертає string/Buffer
 * ⚠️ не для дуже великих файлів (краще streams)
 */
// const text = await readFile("hello.txt", "utf-8");

/**
 * writeFile(path, data, encoding?)
 * ✅ записує файл З НУЛЯ (перезаписує повністю, якщо існує)
 * ⚠️ старий вміст затирається
 */
// await writeFile("out.txt", "Новий вміст\n", "utf-8");

/**
 * appendFile(path, data, encoding?)
 * ✅ додає дані В КІНЕЦЬ файлу (створює файл, якщо його нема)
 * ✅ ідеально для логів
 */
// await appendFile("log.txt", "Запис у лог\n", "utf-8");

/* =========================
   2) JSON.parse / JSON.stringify
   ========================= */

/**
 * JSON.parse(string)
 * ✅ перетворює JSON-текст -> JS-обʼєкт/масив
 * ⚠️ впаде з помилкою, якщо JSON “кривий”
 */
// const users = JSON.parse('[{"id":1,"name":"Ann"}]');

/**
 * JSON.stringify(value, replacer?, space?)
 * ✅ перетворює JS-обʼєкт/масив -> JSON-текст
 * ✅ space=2 робить “красивий” формат
 * ⚠️ не вміє зберігати functions/undefined, BigInt (без кастому), циклічні посилання
 */
// const pretty = JSON.stringify(users, null, 2);

/* =========================
   3) Потоки (Streams): createReadStream / createWriteStream, pipe
   ========================= */

// import fs from "node:fs";

/**
 * Потік (stream)
 * ✅ дані йдуть ЧАСТИНАМИ (chunks), а не “все одразу”
 * ✅ економить RAM, ідеально для великих файлів/мережі
 *
 * createReadStream(path, options)
 * ✅ Readable stream (джерело даних)
 */
// const readable = fs.createReadStream("bigfile.txt", { encoding: "utf8" });

/**
 * createWriteStream(path, options)
 * ✅ Writable stream (приймач даних)
 */
// const writable = fs.createWriteStream("copy.txt", { encoding: "utf8" });

/**
 * readable.on('data', chunk)
 * ✅ отримує порції даних (chunk)
 * ⚠️ треба також слухати 'error' та 'end' у ручному режимі
 */
// readable.on("data", (chunk) => {
//   chunk = частина файла
//   console.log(chunk);
// });

// readable.on("end", () => {
//   console.log("done reading");
// });

// readable.on("error", (err) => {
//   console.error("read error", err);
// });

/**
 * pipe(destination)
 * ✅ “зʼєднує” потоки: readable -> writable
 * ✅ автоматично керує backpressure (коли запис не встигає)
 * ✅ менше коду й менше помилок, ніж вручну writable.write(chunk)
 */
// readable.pipe(writable);

/* =========================
   4) createGzip (zlib) + pipe (стиснення)
   ========================= */

// import zlib from "node:zlib";

/**
 * createGzip()
 * ✅ Transform stream: бере chunks -> стискає -> віддає далі
 * ✅ gzip = стиснення БЕЗ ВТРАТ (після розпаковки дані ті самі)
 */
// const gzip = zlib.createGzip();

/**
 * Стиснення файла:
 * source (read) -> gzip (transform) -> dest (write)
 */
// fs.createReadStream("hello.txt")
//   .pipe(gzip)
//   .pipe(fs.createWriteStream("hello.txt.gz"));

/**
 * (додатково) Розпаковка:
 * .gz -> gunzip -> звичайний файл
 */
// fs.createReadStream("hello.txt.gz")
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream("hello_unzipped.txt"));

// =============================================================================================================================================
// =============================================================================================================================================
// =============================================================================================================================================

// import { createServer } from "node:http";
// import { readFile, writeFile, appendFile } from "node:fs/promises";

// const filePath = "users.json";

// async function addUser(newUser) {
//   const raw = await readFile(filePath, "utf-8");
//   const users = JSON.parse(raw);

//   if (!newUser) {
//     throw new Error(
//       "You should hand over a new user info before adding new user!"
//     );
//   }

//   if (!(typeof newUser === "object")) {
//     throw new Error(
//       "Not appropriate type of hung user, it should be an object!"
//     );
//   }

//   if (users.some((u) => u.id === newUser.id)) {
//     throw new Error(`User with such id ${newUser.id} already exists!`);
//   }

//   if (users.some((u) => u.email === newUser.email)) {
//     throw new Error(`User with such email ${newUser.email} already exists!`);
//   }

//   users.push({
//     ...newUser,
//     createdAt: newUser.createdAt ?? new Date().toISOString(),
//   });

//   await writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
// }

// const server = createServer(async (req, res) => {
//   const url = new URL(req.url, "http://localhost:3000").pathname;
//   console.log(url);

//   res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });

//   const usersInfo = await addUser({ id: 1, name: "Ihor Prokop" });

//   res.end(usersInfo);
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });

// import { readFile, writeFile, appendFile } from "node:fs/promises";

// const filePath = "users.json";

// const raw = await readFile(filePath, "utf-8");

// const userInfoObj = JSON.parse(raw);

// const timestamp2 = new Date().toLocaleString("uk-UA");

// console.log(userInfoObj);
// console.log(typeof userInfoObj);
// console.log(userInfoObj[0]);

// const hours = new Date().getHours();
// const minutes = new Date().getMinutes();
// const seconds = new Date().getSeconds();
// const date = new Date().getDate();
// const month = new Date().getMonth();
// const year = new Date().getFullYear();
// const timestamp = `At ${hours}:${minutes}:${seconds}, On ${date}/${month + 1}/${year}`;
