import path from "path";
import fse from "fs-extra";
import { Language } from "../types/types";
import { FOLDER_PATH } from "../lib/const";

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
  const configPath = `${FOLDER_PATH}/app-template`;

  const fontsSrc = path.join(configPath, "/fonts");
  const fontsDest = path.join(projectDir, "/src/app/fonts");
  fse.copySync(fontsSrc, fontsDest);

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
  }
};
