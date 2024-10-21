import fs from "fs";
import path from "path";

interface createProjectProp {
  projectName: string;
}

const createProject = ({ projectName }: createProjectProp) => {
  const projectDir = path.resolve(process.cwd(), projectName);
  
};

export default createProject;
