import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PackageManager } from "../types/types";
import getPackageManager from "../lib/getPackageManager";

export const InstallDependencies = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const pkg = getPackageManager();
  console.log(chalk.blue(`Installing dependencies...\n`));
  switch (pkg) {
    case "npm":
      await execa(pkg, ["install"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "pnpm":
      await execa(pkg, ["install"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "yarn":
      await execa(pkg, {
        cwd: projectDir,
        stdio: "inherit",
      });
  }
  ora().succeed(chalk.green("Dependencies installed successfully!"));
};
