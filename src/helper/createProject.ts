import path from "path";
import { AuthProvider, DatabaseORM, Language } from "../types/types";
import folderStructure from "./folderStructure";
import { installDependencies } from "./installDependencies";
import initializeGit from "./initiializeGit";
import { upgradeDependencies } from "./upgradeDependencies";
import { logger } from "../lib/logger";

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
  const projectDir = path.resolve(process.cwd(), projectName);
  folderStructure({
    authProvider,
    componentLibrary,
    databaseORM,
    projectDir,
    projectName,
    styling,
    language,
  });
  await installDependencies({ projectDir });
  await upgradeDependencies({ projectDir });
  await initializeGit(projectDir);
  logger.success(`${projectName} created successfully!\n`);
};

export default createProject;
