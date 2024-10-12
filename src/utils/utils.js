export const successful = () => {
  console.log(`You are currently in ${process.cwd()}\n`);
};

export const failed = () => {
  console.log("Operation failed\n");
  console.log(`You are currently in ${process.cwd()}\n`);
};


