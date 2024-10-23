import { execa } from "execa";
import { logger } from "../lib/logger";
import ora from "ora";
import chalk from "chalk";

const initializeGit = async (projectDir: string) => {
  logger.info("Initializing git...");
  await execa("git", ["init"], {
    cwd: projectDir,
    stdio: "inherit",
  });
  ora().succeed(chalk.green("Initialized empty Git repository "));
};

export default initializeGit;
