#!/usr/bin/env node
import cli from "./cli/index";
import createProject from "./helper/createProject";
import {
  AuthProvider,
  DatabaseORM,
  Language,
} from "./types/types";

const main = async () => {
  try {
    const cliResponse = await cli();
    const {
      projectName,
      language,
      authProvider,
      databaseORM,
      styling,
      componentLibrary,
    } = cliResponse;

    await createProject({
      projectName,
      language: language as Language,
      authProvider: authProvider as AuthProvider,
      databaseORM: databaseORM as DatabaseORM,
      styling,
      componentLibrary,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};

main();
