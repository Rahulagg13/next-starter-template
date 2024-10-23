import path from "path";
import fse from "fs-extra";
import { AuthProvider } from "../types/types";
import addPackageDependency from "../helper/addPackageDependency";

interface AuthBoilerPlateProp {
  projectDir: string;
  authProvider: AuthProvider;
}

export const AuthBoilerPlate = ({
  projectDir,
  authProvider,
}: AuthBoilerPlateProp) => {
  const configPath = "src/template/preferences/authProvider/nextauth";

  if (authProvider === "next-auth") {
    addPackageDependency({
      dependencies: ["next-auth"],
      devDependencies: false,
      projectDir,
    });
    const NextAuthConfig = path.join(configPath, "/src/app/api");
    const NextAuthFile = path.join(projectDir, "/src/app/api");

    fse.copySync(NextAuthConfig, NextAuthFile);

    const AuthFileSrc = path.join(configPath, "/src/lib");
    const AuthFileDest = path.join(projectDir, "/src/lib");

    fse.copySync(AuthFileSrc, AuthFileDest);

    const MiddlewareFileSrc = path.join(configPath, "/src/middleware.ts");
    const MiddlewareFileDest = path.join(projectDir, "middleware.ts");

    fse.copySync(MiddlewareFileSrc, MiddlewareFileDest);
  }
  //   else if (authProvider === "") {
  //     //latter
  //   }
};
