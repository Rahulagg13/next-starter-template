import path from "path";
import { ROOT_FOLDER } from "../lib/const";
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
  const configPath = path.join(ROOT_FOLDER, `src/template/preferences/orm`);

  const deps: AvailableDependencies[] = ["@prisma/client"];

  if (databaseORM === "prisma") {
    const prismaConfig = path.join(configPath, "/prismaConfig/prismaSchema");
    
    const prismaFile = path.join(projectDir, "/prisma/schema.prisma");

    if (authProvider === "next-auth") {
      deps.push("@auth/prisma-adapter");
      const prismaSrc = path.join(prismaConfig, `/with-nextAuth.prisma`);
      fse.copySync(prismaSrc, prismaFile);
    } else {
      const prismaSrc = path.join(prismaConfig, `/base.prisma`);
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
    const packageJson = fse.readJSONSync(path.join(projectDir, "package.json"));
    packageJson.scripts = {
      ...packageJson.scripts,
      postinstall: "prisma generate",
      "db:push": "prisma db push",
      "db:studio": "prisma studio",
      "db:generate": "prisma migrate dev",
      "db:migrate": "prisma migrate deploy",
    };
    fse.writeJSONSync(path.join(projectDir, "package.json"), packageJson, {
      spaces: 2,
    });
  }
  // else if (databaseORM === "drizzle") {
  //   //latter
  // }
};
