import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { failed, successful } from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const rename = async (args) => {
    if (args.length > 2) {
      const pathToFile = getPath(args[1]);
      const pathToDestination = getPath(args[2]);
      fs.rename(pathToFile, pathToDestination, (e) => {
        if (e) {
          failed();
        } else {
          successful();
        }
      });
    } else {
      console.log("Invalid input");
    }
  };