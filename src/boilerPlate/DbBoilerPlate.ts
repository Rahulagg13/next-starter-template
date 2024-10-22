import path from "path";
import { ROOT_FOLDER } from "../lib/const";
import fse from "fs-extra";
import { AuthProvider, DatabaseORM } from "../types/types";

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
  const configPath = "src/template/preferences/orm";

  if (databaseORM === "prisma") {
    const prismaConfig = configPath + "/prismaConfig/prismaSchema";
    const prismaFile = path.join(projectDir, "/prisma/schema.prisma");

    if (authProvider === "next-auth") {
      const prismaSrc = path.join(
        ROOT_FOLDER,
        `${prismaConfig}/with-nextAuth.prisma`
      );
      fse.copySync(prismaSrc, prismaFile);
    } else {
      const prismaSrc = path.join(ROOT_FOLDER, `${prismaConfig}/base.prisma`);
      fse.copySync(prismaSrc, prismaFile);
    }
    const prismaClientSrc = path.join(configPath, "/prismaConfig/client.ts");
    const prismaClientDest = path.join(projectDir, "/src/db/client.ts");

    fse.copySync(prismaClientSrc, prismaClientDest);
  }
  // else if (databaseORM === "drizzle") {
  //   //latter
  // }
};
