import readline from "node:readline";

const params = process.argv.slice(2);
const joinedParams = params.join("&");
const paramsMap = new URLSearchParams(joinedParams);
const pensionAge = Number(paramsMap.get("--pension").trim());

if (!pensionAge || !Number.isFinite(pensionAge) || pensionAge < 0) {
    console.log("Error:\nUsage: node task01.mjs --pension=<pensionAge>");
    process.exit(1);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Your age: ", (age) => {
    const userAge = Number(age.trim());

    if (userAge >= pensionAge) {
      console.log("You are pensioner");
    } else {
      console.log("You are not pensioner");
    }
    rl.close();
})

rl.on("close", () => {
  console.log("Exiting...");
  process.exit(0);
})

