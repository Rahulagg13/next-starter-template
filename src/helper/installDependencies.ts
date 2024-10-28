import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PackageManager } from "../types/types";
import getPackageManager from "../lib/getPackageManager";

const runCommand = async (projectDir: string, pkgManager: PackageManager) => {
  switch (pkgManager) {
    case "npm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stdout: "inherit",
        stderr: "inherit",
      });
      break;
    case "pnpm":
      await execa(pkgManager, ["install"], {
        cwd: projectDir,
        stdout: "inherit",
        stderr: "inherit",
      });
      break;
    case "yarn":
      await execa(pkgManager, {
        cwd: projectDir,
        stdout: "inherit",
        stderr: "inherit",
      });
      break;
  }
};

export const installDependencies = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const pkgManager: PackageManager = getPackageManager();
  console.log(chalk.blue("Installing dependencies..."));
  await runCommand(projectDir, pkgManager);

  ora().succeed(chalk.green("Successfully installed dependencies!\n"));
};
