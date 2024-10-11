import fs from "fs";
import crypto from "crypto";
import { failed, successful } from "../fs/fs.js";
import stream from "stream/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, filename);

export const hash = async (args) => {
  if (args.length > 1) {
    try {
      const pathToFile = getPath(args[1]);
      const hash = crypto.createHash("sha256");
      const readStream = fs.createReadStream(pathToFile);
      await stream.pipeline(readStream, hash);
      console.log(hash.digest());
      successful();
    } catch (e) {
      failed();
    }
  } else {
    console.log("Invalid input");
  }
};

/*
import fs from 'fs';
import crypto from 'crypto';
import stream from 'stream/promises';

const calculateHash = async () => {
  const hash = crypto.createHash('sha256');
  const readableStream = fs.createReadStream('./src/hash/files/fileToCalculateHashFor.txt');
  await stream.pipeline(readableStream, hash);
  console.log(hash.digest('hex'));
};

await calculateHash();
  */
