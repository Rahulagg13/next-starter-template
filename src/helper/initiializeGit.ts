import { execa } from "execa";
import { logger } from "../lib/logger";
import ora from "ora";
import chalk from "chalk";

const initializeGit = async (projectDir: string) => {
  logger.info("Initializing git...\n");
  await execa("git", ["init"], {
    cwd: projectDir,
    stdout: "ignore",
  });
  ora().succeed(chalk.green("Initialized empty Git repository\n"));
};

export default initializeGit;
