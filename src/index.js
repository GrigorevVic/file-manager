import { getDataOs } from "./os/os.js";
import { compressFile } from "./compress/compress.js";
import { readFile, remove, createFile } from "./fs/fs.js";

const args = process.argv.slice(2)[0];
const name = args.split("=")[1];

console.log(`Welcome to the File Manager, ${name}!\n`);
console.log(`You are currently in ${process.cwd()}\n`);

const exit = () => {
  console.log(`\nThank you for using File Manager, ${name}, goodbye!`);
  // setTimeout(() => {}, 60000);
  process.exit(0);
};

const echoInput = (data) => {
  const dataToString = data.toString();
  if (dataToString.includes(".exit")) {
    exit();
  }

  process.on("SIGINT", () => {
    exit();
  });
  const args = dataToString.trim().split(" ");
  const argsNormalize = args.map((el) => el.replace(/\n/g, ""));
  switch (argsNormalize[0]) {
    case "os":
      console.log(getDataOs(argsNormalize));
      break;
    case "compress":
      compressFile(argsNormalize);
      break;
    case "decompress":
      compressFile(argsNormalize);
      break;
    case "cat":
      readFile(argsNormalize);
      break;
    case "rm":
      remove(argsNormalize);
      break;
    case "add":
      createFile(argsNormalize);
      break;
    default:
      console.log("Operation failed");
      console.log(`You are currently in ${process.cwd()}\n`);
      break;
  }
};

process.stdin.on("data", echoInput);
