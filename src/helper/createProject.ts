import path from "path";
import {
  AuthProvider,
  DatabaseORM,
  Language,
  PackageManager,
} from "../types/types";
import folderStructure from "./folderStructure";
import { InstallDependencies } from "./installDependencies";
import chalk from "chalk";
import ora from "ora";

interface createProjectProp {
  projectName: string;
  language: Language;
  authProvider: AuthProvider;
  databaseORM: DatabaseORM;
  packageManager: PackageManager;
  styling: boolean;
  componentLibrary: boolean;
}

const createProject = async ({
  projectName,
  language,
  authProvider,
  databaseORM,
  packageManager,
  styling,
  componentLibrary,
}: createProjectProp) => {
  const spinner = ora();

  const projectDir = path.resolve(process.cwd(), projectName);

  folderStructure({
    authProvider,
    componentLibrary,
    databaseORM,
    projectDir,
    projectName,
    styling,
  });
  await InstallDependencies({ packageManager, projectDir });

  spinner.succeed(`${projectName} ${chalk.green("Created successfully!")}\n`);
};

export default createProject;
