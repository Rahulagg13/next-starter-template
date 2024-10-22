import path from "path";
import fse from "fs-extra";

interface ShadcnBoilerPlateProp {
  projectDir: string;
}

export const ShadcnBoilerPlate = ({ projectDir }: ShadcnBoilerPlateProp) => {
  const configPath = "src/template/preferences/componentLibrary/shadcn";

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
