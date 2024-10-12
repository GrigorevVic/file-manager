import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream, unlink } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { failed, successful } from "../utils/utils.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const compressFile = async (args) => {
  if (args.length > 2) {
    const pathToFile = getPath(args[1]);
    const pathToDestination = getPath(args[2]);
    const brotli =
      argsNormalize[0] === "compress"
        ? createBrotliCompress()
        : createBrotliDecompress();
    const readableStream = createReadStream(pathToFile);

    readableStream.on("error", (e) => {
      unlink(pathToDestination, () => {
        failed();
      });
    });

    const writeStream = createWriteStream(pathToDestination);
    writeStream.on("finish", () => {
      successful();
    });
    writeStream.on("error", (e) => {
      failed();
    });
    readableStream.pipe(brotli).pipe(writeStream);
  } else {
    console.log("Invalid input");
  }
};
