import path from "path";
import { ROOT_FOLDER } from "../lib/const";
import ora from "ora";
import chalk from "chalk";
import fse from "fs-extra";
import { TailwindBoilerPlate } from "../boilerPlate/TailwindBoilerPlate";
import { ShadcnBoilerPlate } from "../boilerPlate/ShadcnBoilerPlate";
import { DbBoilerPlate } from "../boilerPlate/DbBoilerPlate";
import { AuthBoilerPlate } from "../boilerPlate/AuthBoilerPlate";
import { AuthProvider, DatabaseORM, Language } from "../types/types";
import { AddTemplate } from "../boilerPlate/AddTemplate";

interface folderStructureProp {
  projectDir: string;
  projectName: string;
  styling: boolean;
  componentLibrary: boolean;
  databaseORM: DatabaseORM;
  authProvider: AuthProvider;
  language: Language;
}

const FolderStructure = ({
  projectDir,
  projectName,
  styling,
  componentLibrary,
  databaseORM,
  authProvider,
  language,
}: folderStructureProp) => {
  const srcDir = path.resolve(ROOT_FOLDER, "src/template/base");

  const spinner = ora(
    `${chalk.green(`Creating a new Next.js project in ${projectName}...`)}`
  ).start();

  if (fse.existsSync(projectDir)) {
    spinner.fail(`${chalk.cyan.bold(projectName)} exists\n`);
    process.exit(1);
  } else {
    spinner.stopAndPersist({
      symbol: `${chalk.green("✔")}`,
    });
    fse.emptyDirSync(projectDir);
  }
  spinner.start();

  fse.copySync(srcDir, projectDir);
  fse.renameSync(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );

  if (styling) {
    TailwindBoilerPlate({ projectDir, componentLibrary });
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
  AddTemplate({ projectDir, language, styling });
  spinner.stop();
};

export default FolderStructure;
