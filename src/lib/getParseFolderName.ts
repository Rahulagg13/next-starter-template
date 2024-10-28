import path from "path";
export const getParseFolderName = (projectDir: string) => {
  return path.basename(projectDir);
};
