#!/usr/bin/env node
import cli from "./cli/index";
import createProject from "./helper/createProject";
const main = async () => {
  try {
    const result = await cli();
    console.log(result);
    createProject({ projectName: result.projectName });
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};

main();
