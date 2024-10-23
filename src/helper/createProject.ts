import path from "path";
import { AuthProvider, DatabaseORM, Language } from "../types/types";
import folderStructure from "./folderStructure";
import { installDependencies } from "./installDependencies";
import chalk from "chalk";
import ora from "ora";
import initializeGit from "./initiializeGit";

interface createProjectProp {
  projectName: string;
  language: Language;
  authProvider: AuthProvider;
  databaseORM: DatabaseORM;
  styling: boolean;
  componentLibrary: boolean;
}

const createProject = async ({
  projectName,
  language,
  authProvider,
  databaseORM,
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
  await installDependencies({ projectDir });

  await initializeGit(projectDir);

  spinner.succeed(`${projectName} ${chalk.green("Created successfully!")}\n`);
};

export default createProject;
