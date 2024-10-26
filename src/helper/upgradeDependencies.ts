import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PackageManager } from "../types/types";
import getPackageManager from "../lib/getPackageManager";

export const upgradeDependencies = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const pkg: PackageManager = getPackageManager();
  console.log(chalk.blue(`Upgrading dependencies...\n`));

  switch (pkg) {
    case "npm":
      await execa(pkg, ["update"], {
        cwd: projectDir,
        stdout: "inherit",
      });
      break;
    case "pnpm":
      await execa(pkg, ["up", "--latest"], {
        cwd: projectDir,
        stdout: "inherit",
      });
      break;

    case "yarn":
      await execa(pkg, ["upgrade"], {
        cwd: projectDir,
        stdout: "inherit",
      });
  }
  ora().succeed(chalk.green("Dependencies updated successfully!"));
};
