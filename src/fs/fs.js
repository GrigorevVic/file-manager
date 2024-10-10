import { createReadStream, unlink } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const readFile = async (args) => {
  if (args.length > 1) {
    const pathToFile = getPath(args[1]);
    const readableStream = createReadStream(pathToFile);
    readableStream.pipe(process.stdout);
    readableStream.on("end", () => {
      process.stdout.write(`\n`);
      console.log(`You are currently in ${process.cwd()}\n`);
    });
    readableStream.on("error", (e) => {
      console.log("Operation failed\n", e.message);
    });
  } else {
    console.log("Invalid input");
  }
};

export const remove = async (args) => {
  if (args.length > 1) {
    const pathToFile = getPath(args[1]);
    unlink(pathToFile, (e) => {
      if (e) {
        console.log("Operation failed\n", e.message);
      } else {
        console.log("\noperation successful!\n");
        console.log(`You are currently in ${process.cwd()}\n`);
      }
    });
  } else {
    console.log("Invalid input");
  }
};

//cat ./src/fs/test.txt
