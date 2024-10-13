import { failed, successful } from "../utils/utils.js";
import fs from "fs";

export const ls = async () => {
  const title = "(index)              Name                             Type";
  const line =
    "_____________________________________________________________\n";
  const dirs = [];
  const filesName = [];
  fs.readdir(
    "./",
    {
      withFileTypes: true,
    },
    (err, files) => {
      for (let i = 0; i < files.length; i += 1) {
        const type = files[i].isFile() ? "file" : "directory";
        type === "file" ? filesName.push(files[i].name) : dirs.push(files[i].name);
      }
      dirs.sort((a, b) => a.toLowerCase() - b.toLowerCase())
      filesName.sort((a, b) => a.toLowerCase() - b.toLowerCase());
     let i = 0;
     console.log(line);
     console.log(title);
     console.log(line);
      dirs.forEach(file => {
        const a = file.padEnd(30, " ");
        console.log(String(i).padStart(4, " "), a.padStart(45, " "), 'directory');
        i += 1;
      });
      filesName.forEach(file => {
        const a = file.padEnd(30, " ");
        console.log(String(i).padStart(4, " "), a.padStart(45, " "), 'files');
        i += 1;
      });
      console.log(line);
      successful();
    }
  );
};
