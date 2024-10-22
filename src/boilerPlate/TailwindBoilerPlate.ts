import path from "path";
import fse from "fs-extra";

interface TailwindBoilerPlateProp {
  projectDir: string;
  styling: boolean;
  componentLibrary: boolean;
}

export const TailwindBoilerPlate = ({
  projectDir,
  styling,
  componentLibrary,
}: TailwindBoilerPlateProp) => {
  const configPath = "src/template/preferences/tailwindConfig";
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
