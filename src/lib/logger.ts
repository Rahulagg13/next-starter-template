import chalk from "chalk";

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.blueBright(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
};
