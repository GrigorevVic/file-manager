import { getDataOs } from "./os/os.js";
import { compressFile } from "./compress/compress.js";

const args = process.argv.slice(2)[0];
const name = args.split("=")[1];

process.stdout.write(`Welcome to the File Manager, ${name}!\n`);
process.stdout.write(`You are currently in ${process.cwd()}\n`);

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
  const args = dataToString.split(" ");
  if (args[0] === "os") {
    console.log(getDataOs(args));
  }
  if (args[0] === "compress" || args[0] === "decompress") {
    compressFile(args);
  }
};

process.stdin.on("data", echoInput);
