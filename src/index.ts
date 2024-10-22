#!/usr/bin/env node
import cli from "./cli/index";
import createProject from "./helper/createProject";
import {
  AuthProvider,
  DatabaseORM,
  Language,
  PackageManager,
  Styling,
} from "./types/types";

const main = async () => {
  try {
    const cliResponse = await cli();
    console.log(cliResponse);

    const {
      projectName,
      language,
      authProvider,
      databaseORM,
      packageManager,
      styling,
      componentLibrary,
    } = cliResponse;

    createProject({
      projectName,
      language: language as Language,
      authProvider: authProvider as AuthProvider,
      databaseORM: databaseORM as DatabaseORM,
      packageManager: packageManager as PackageManager,
      styling: styling as Styling,
      componentLibrary,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};

main();
