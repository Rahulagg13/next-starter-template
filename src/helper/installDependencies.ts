import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PackageManager } from "../types/types";

export const InstallDependencies = async ({
  projectDir,
  packageManager,
}: {
  projectDir: string;
  packageManager: PackageManager;
}) => {
  console.log(chalk.blue(`Installing dependencies...\n`));
  switch (packageManager) {
    case "npm":
      await execa(packageManager, ["install"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "pnpm":
      await execa(packageManager, ["install"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "yarn":
      await execa(packageManager, {
        cwd: projectDir,
        stdio: "inherit",
      });
  }
  ora().succeed(chalk.green("Dependencies installed successfully!"));
};
