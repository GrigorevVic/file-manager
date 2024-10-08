import os from "os";

export const getDataOs = (args) => {
  const arg = args[1].replace(/\n/g, "");

  switch (arg) {
    case "--cpus":
      return os.cpus();
    case "--architecture":
      return os.arch();
    case "--EOL":
      return os.EOL;
    case "--homedir":
      return "HomeDir - unrealized";
    case "--username":
      return "username - unrealized";
    default:
      return "Invalid input";
  }
};
