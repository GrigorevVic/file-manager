import os from "os";

export const getDataOs = (args) => {

  switch (args[1]) {
    case "--cpus":
      return os.cpus();
    case "--architecture":
      return os.arch();
    case "--EOL":
      return os.EOL;
    case "--homedir":
      return os.userInfo().homedir;
    case "--username":
      return os.userInfo().username;
    default:
      return "Invalid input";
  }
};
