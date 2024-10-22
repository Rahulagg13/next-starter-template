import path from "path";
import ora from "ora";
import chalk from "chalk";
import { ROOT_FOLDER } from "../lib/const";
import fse from "fs-extra";
import { DbBoilerPlate } from "../boilerPlate/DbBoilerPlate";
import { AuthBoilerPlate } from "../boilerPlate/AuthBoilerPlate";
import {
  AuthProvider,
  DatabaseORM,
  Language,
  PackageManager,
} from "../types/types";
import { ShadcnBoilerPlate } from "../boilerPlate/ShadcnBoilerPlate";
import { TailwindBoilerPlate } from "../boilerPlate/TailwindBoilerPlate";

interface createProjectProp {
  projectName: string;
  language: Language;
  authProvider: AuthProvider;
  databaseORM: DatabaseORM;
  packageManager: PackageManager;
  styling: boolean;
  componentLibrary: boolean;
}

const createProject = ({
  projectName,
  language,
  authProvider,
  databaseORM,
  packageManager,
  styling,
  componentLibrary,
}: createProjectProp) => {
  const projectDir = path.resolve(process.cwd(), projectName);

  const srcDir = path.resolve(ROOT_FOLDER, "src/template/base");

  const spinner = ora(
    `${chalk.green(`Creating a new Next.js project in ${projectName}...`)}`
  ).start();

  if (fse.existsSync(projectDir)) {
    spinner.fail(`${chalk.cyan.bold(projectName)} exists\n`);
    process.exit(1);
  } else {
    spinner.stopAndPersist();
    fse.emptyDirSync(projectDir);
  }
  spinner.start();

  fse.copySync(srcDir, projectDir);
  fse.renameSync(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );
  spinner.succeed(`${projectName} ${chalk.green("Created successfully!")}\n`);

  if (styling) {
    TailwindBoilerPlate({ projectDir, componentLibrary, styling });
  }
  if (componentLibrary) {
    ShadcnBoilerPlate({ projectDir });
  }
  if (databaseORM !== "none") {
    DbBoilerPlate({ projectDir, databaseORM, authProvider });
  }
  if (authProvider !== "none") {
    AuthBoilerPlate({ projectDir, authProvider });
  }
};

export default createProject;
