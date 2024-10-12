import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { failed, successful } from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const copy = async (args) => {
    if (args.length > 2) {
      const pathToFile = getPath(args[1]);
      const pathToDestination = getPath(args[2]);
      const readStream = fs.createReadStream(pathToFile);
      const writeStream = fs.createWriteStream(pathToDestination);
      readStream.on("error", () => {
        fs.unlink(pathToDestination, () => {
          console.log("Operation failed\n");
        });
      });
      writeStream.on("finish", () => {
        successful();
      });
      writeStream.on("error", (e) => {
        failed();
      });
  
      readStream.pipe(writeStream);
    } else {
      console.log("Invalid input");
    }
  };