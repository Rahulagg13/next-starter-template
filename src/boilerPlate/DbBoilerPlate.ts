import path from "path";
import { FOLDER_PATH, ROOT_FOLDER } from "../lib/const";
import fse from "fs-extra";
import { AuthProvider, DatabaseORM } from "../types/types";
import addPackageDependency from "../helper/addPackageDependency";
import { AvailableDependencies } from "../lib/dependencyMap";

interface DbBoilerPlateProp {
  projectDir: string;
  databaseORM: DatabaseORM;
  authProvider: AuthProvider;
}

export const DbBoilerPlate = ({
  projectDir,
  databaseORM,
  authProvider,
}: DbBoilerPlateProp) => {
  const configPath = `${FOLDER_PATH}/orm`;

  const deps: AvailableDependencies[] = ["@prisma/client"];

  if (databaseORM === "prisma") {
    const prismaConfig = configPath + "/prismaConfig/prismaSchema";
    const prismaFile = path.join(projectDir, "/prisma/schema.prisma");

    if (authProvider === "next-auth") {
      deps.push("@auth/prisma-adapter");
      const prismaSrc = path.join(
        ROOT_FOLDER,
        `${prismaConfig}/with-nextAuth.prisma`
      );
      fse.copySync(prismaSrc, prismaFile);
    } else {
      const prismaSrc = path.join(ROOT_FOLDER, `${prismaConfig}/base.prisma`);
      fse.copySync(prismaSrc, prismaFile);
    }

    addPackageDependency({
      dependencies: deps,
      devDependencies: false,
      projectDir,
    });
    addPackageDependency({
      projectDir,
      dependencies: ["prisma"],
      devDependencies: true,
    });

    const prismaClientSrc = path.join(configPath, "/prismaConfig/client.ts");
    const prismaClientDest = path.join(projectDir, "/src/db/client.ts");

    fse.copySync(prismaClientSrc, prismaClientDest);
  }
  // else if (databaseORM === "drizzle") {
  //   //latter
  // }
};
