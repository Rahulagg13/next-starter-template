import path from "path";
import fse from "fs-extra";
import { Language } from "../types/types";

interface AddTemplateProp {
  projectDir: string;
  language: Language;
  styling: boolean;
}

export const AddTemplate = ({
  projectDir,
  language,
  styling,
}: AddTemplateProp) => {
  const configPath = "src/template/preferences/app-template";

  if (language === "typeScript") {
    if (styling) {
      const layoutSrc = path.join(configPath, "/app-tw/ts");
      const layoutDest = path.join(projectDir, "/src/app");
      fse.copySync(layoutSrc, layoutDest);
    } else {
      const layoutSrc = path.join(configPath, "/default-app/ts");
      const layoutDest = path.join(projectDir, "/src/app");
      fse.copySync(layoutSrc, layoutDest);
    }

    const fontsSrc = path.join(configPath, "/fonts");
    const fontsDest = path.join(projectDir, "/src/app/fonts");

    fse.copySync(fontsSrc, fontsDest);
  }
};
