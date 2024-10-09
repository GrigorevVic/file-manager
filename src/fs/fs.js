import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const readFile = async (args) => {
  if (args.length > 1) {
  const argsNormalize = args.filter((el) => el !== "");
  const pathToFile = getPath(argsNormalize[1]);
  const readableStream = fs.createReadStream(pathToFile);
  readableStream.pipe(process.stdout);
  readableStream.on("end", () => {
    process.stdout.write(`\n`);
  });
  readableStream.on("error", (e) => {
    console.log("Invalid input", e.message);
  });
} else {
    console.log("Invalid input");
}
};


//cat ./src/fs/test.txt