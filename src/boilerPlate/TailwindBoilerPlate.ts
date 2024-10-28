import path from "path";
import fse from "fs-extra";
import addPackageDependency from "../helper/addPackageDependency";
import { FOLDER_PATH } from "../lib/const";

interface TailwindBoilerPlateProp {
  projectDir: string;
  componentLibrary: boolean;
}

export const TailwindBoilerPlate = ({
  projectDir,
  componentLibrary,
}: TailwindBoilerPlateProp) => {
  const configPath = `${FOLDER_PATH}/tailwindConfig`;

  addPackageDependency({
    dependencies: ["tailwindcss", "postcss"],
    devDependencies: false,
    projectDir,
  });
  if (!componentLibrary) {
    const tailwindSrc = path.join(configPath, "tailwind.config.ts");
    const tailwindDest = path.join(projectDir, "tailwind.config.ts");

    fse.copySync(tailwindSrc, tailwindDest);

    const GlobalCssConfig = path.join(configPath, "globals.css");
    const GlobalCssFile = path.join(projectDir, "/src/app/globals.css");

    fse.copySync(GlobalCssConfig, GlobalCssFile);
  }

  const PostCssConfig = path.join(configPath, "postcss.config.mjs");
  const PostCssFile = path.join(projectDir, "postcss.config.mjs");

  fse.copySync(PostCssConfig, PostCssFile);
};
