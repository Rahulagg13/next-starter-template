import path from "path";
import fse from "fs-extra";
import { AuthProvider } from "../types/types";

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
    const NextAuthConfig = path.join(configPath, "/src/app/api");
    const NextAuthFile = path.join(projectDir, "/src/app/api");

    fse.copySync(NextAuthConfig, NextAuthFile);

    const AuthFileSrc = path.join(configPath, "/src/auth.ts");
    const AuthFileDest = path.join(projectDir, "/src/lib/auth.ts");

    fse.copySync(AuthFileSrc, AuthFileDest);

    const MiddlewareFileSrc = path.join(configPath, "/src/middleware.ts");
    const MiddlewareFileDest = path.join(projectDir, "middleware.ts");

    fse.copySync(MiddlewareFileSrc, MiddlewareFileDest);
  }
  //   else if (authProvider === "") {
  //     //latter
  //   }
};
