import path from "path";
import fse from "fs-extra";
import addPackageDependency from "../helper/addPackageDependency";
import { ROOT_FOLDER } from "../lib/const";

interface ShadcnBoilerPlateProp {
  projectDir: string;
}

export const ShadcnBoilerPlate = ({ projectDir }: ShadcnBoilerPlateProp) => {
  addPackageDependency({
    dependencies: [
      "tailwind-merge",
      "clsx",
      "tailwindcss-animate",
      "@radix-ui/react-icons",
      "lucide-react",
      "class-variance-authority",
    ],
    devDependencies: false,
    projectDir,
  });
  const configPath = path.join(
    ROOT_FOLDER,
    `src/template/preferences/componentLibrary/shadcn`
  );

  const ShadcnConfig = path.join(configPath, "/src");
  const ShadcnFile = path.join(projectDir, "/src");

  fse.copySync(ShadcnConfig, ShadcnFile);

  const componentSrc = path.join(configPath, "components.json");
  const componentDest = path.join(projectDir, "components.json");

  fse.copySync(componentSrc, componentDest);

  const tailwindSrc = path.join(configPath, "tailwind.config.ts");
  const tailwindDest = path.join(projectDir, "tailwind.config.ts");

  fse.copySync(tailwindSrc, tailwindDest);
};
