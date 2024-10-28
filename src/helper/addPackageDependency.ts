import fse from "fs-extra";
import path from "path";
import sortPackageJson from "sort-package-json";
import {
  dependencyMap,
  type AvailableDependencies,
} from "../lib/dependencyMap";
import { getParseFolderName } from "../lib/getParseFolderName";

const addPackageDependency = (options: {
  dependencies: AvailableDependencies[];
  devDependencies: boolean;
  projectDir: string;
}) => {
  const { dependencies, devDependencies, projectDir } = options;
  const packageJson = fse.readJSONSync(path.join(projectDir, "package.json"));
  packageJson.name = getParseFolderName(projectDir);

  dependencies.forEach((pkg) => {
    if (devDependencies && packageJson.devDependencies) {
      packageJson.devDependencies[pkg] = dependencyMap[pkg];
    } else {
      packageJson.dependencies[pkg] = dependencyMap[pkg];
    }
  });

  const sortedJson = sortPackageJson(packageJson);
  fse.writeJsonSync(path.join(projectDir, "package.json"), sortedJson, {
    spaces: 2,
  });
};

export default addPackageDependency;
