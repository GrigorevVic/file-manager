import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const successful = () => {
  console.log("\noperation successful!\n");
  console.log(`You are currently in ${process.cwd()}\n`);
};

export const failed = () => {
  console.log("Operation failed\n");
  console.log(`You are currently in ${process.cwd()}\n`);
};

export const readFile = async (args) => {
  if (args.length > 1) {
    const pathToFile = getPath(args[1]);
    const readableStream = fs.createReadStream(pathToFile);
    readableStream.pipe(process.stdout);
    readableStream.on("end", () => {
      successful();
    });
    readableStream.on("error", (e) => {
      failed();
    });
  } else {
    console.log("Invalid input");
  }
};

export const remove = async (args) => {
  if (args.length > 1) {
    const pathToFile = getPath(args[1]);
    fs.unlink(pathToFile, (e) => {
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

export const move = async (args) => {
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
      fs.unlink(pathToFile, () => {});
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

//cat ./src/fs/test.txt
