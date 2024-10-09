import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream, unlink } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const compressFile = async (args) => {
  if (args.length > 2) {
    const argsNormalize = args.filter((el) => el !== "");
    const pathToFile = getPath(argsNormalize[1]);
    const pathToDestination = getPath(argsNormalize[2]);
    const brotli =
      argsNormalize[0] === "compress"
        ? createBrotliCompress()
        : createBrotliDecompress();
    const readableStream = createReadStream(pathToFile);

    readableStream.on("error", (e) => {
      unlink(pathToDestination, (err) => {});
      console.log("Invalid input\n", e.message);
    });

    const writeStream = createWriteStream(pathToDestination);
    writeStream.on("finish", () => {
      console.log("\noperation successful!\n");
      console.log(`You are currently in ${process.cwd()}\n`);
    });
    writeStream.on("error", (e) => {
      console.log("Invalid input\n", e.message);
    });
    readableStream.pipe(brotli).pipe(writeStream);
  } else {
    console.log("Invalid input");
  }
};

// compress test.txt test.gz
// decompress test.gz test2.txt
