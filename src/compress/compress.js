import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";

export const compressFile = async (args) => {
  if (args.length > 2) {
  const argsNormalize = args.filter((el) => el !== "");
  const pathToFile = argsNormalize[1];
  const pathToDestination = argsNormalize[2];
  const brotli = argsNormalize[0] === "compress" ? createBrotliCompress() : createBrotliDecompress();
  const readableStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(pathToDestination.replace(/\n/g, ""));
  readableStream.pipe(brotli).pipe(writeStream);
  readableStream.on("error", (e) => {
    console.log("Error!!!", e.message);
  });
  writeStream.on("error", (e) => {
    console.log("Error!!!", e.message);
  });
} else {
  console.log("uncorrect arguments!");
}
};

// compress ./src/compress/test.txt ./src/compress/test.gz
// decompress  ./src/compress/test.gz ./src/compress/test2.txt
