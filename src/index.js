import { getDataOs } from "./os/os.js";
import { compressFile } from "./compress/compress.js";
import { failed, successful } from "./utils/utils.js";
import { hash } from "./hash/hash.js";
import { copy } from "./fs/copy.js";
import { createFile } from "./fs/create.js";
import { move } from "./fs/move.js";
import { readFile } from "./fs/read.js";
import { remove } from "./fs/remove.js";
import { rename } from "./fs/rename.js";
import { ls } from "./navigation/ls.js";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";

const args = process.argv.slice(2)[0];
const name = args.split("=")[1];

console.log(`Welcome to the File Manager, ${name}!\n`);
console.log(`You are currently in ${process.cwd()}\n`);

const rl = createInterface({ input, output });
rl.on("line", (input) => {
  const dataToString = input.toString();
  if (input === ".exit") {
    rl.close();
    process.exit(0);
  }

  const args = dataToString.trim().split(" ");
  const argsNormalize = args.map((el) => el.replace(/\n/g, ""));
  switch (argsNormalize[0]) {
    case "os":
      console.log(getDataOs(argsNormalize));
      successful();
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
    case "rn":
      rename(argsNormalize);
      break;
    case "cp":
      copy(argsNormalize);
      break;
    case "mv":
      move(argsNormalize);
      break;
    case "hash":
      hash(argsNormalize);
      break;
    case "up":
      process.chdir("../");
      successful();
      break;
    case "cd":
      try {
        process.chdir(argsNormalize[1]);
        successful();
      } catch (e) {
        failed();
      }
      break;
    case "ls":
      ls();
      break;
    default:
      failed();
      break;
  }
});

process.on("exit", () => {
  console.log(`\nThank you for using File Manager, ${name}, goodbye!`);
  process.exit(0);
});

