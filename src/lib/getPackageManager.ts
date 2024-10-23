import { PackageManager } from "../types/types";

const getPackageManager: () => PackageManager = () => {
  const pkgManager = process.env.npm_config_user_agent;
  if (pkgManager) {
    if (pkgManager.startsWith("yarn")) return "yarn";
    if (pkgManager.startsWith("pnpm")) return "pnpm";
    else return "npm";
  } else {
    return "npm";
  }
};

export default getPackageManager;
