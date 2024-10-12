import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { failed, successful } from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const createFile = async (args) => {
    if (args.length > 1) {
      const pathToFile = getPath(args[1]);
      fs.access(pathToFile, fs.constants.F_OK, (e) => {
        if (e) {
          fs.open(pathToFile, "w", () => {
            successful();
          });
        } else {
          failed();
        }
      });
    } else {
      console.log("Invalid input");
    }
  };