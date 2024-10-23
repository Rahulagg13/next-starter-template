import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PackageManager } from "../types/types";
import getPackageManager from "../lib/getPackageManager";

export const installDependencies = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const pkg = getPackageManager();
  console.log(chalk.blue(`Installing dependencies...\n`));
  switch (pkg) {
    case "npm":
      await execa(pkg, ["update"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "pnpm":
      await execa(pkg, ["up", "--latest"], {
        cwd: projectDir,
        stdio: "inherit",
      });
      break;
    case "yarn":
      await execa(pkg, ["upgrade"], {
        cwd: projectDir,
        stdio: "inherit",
      });
  }
  ora().succeed(chalk.green("Dependencies installed successfully!"));
};
