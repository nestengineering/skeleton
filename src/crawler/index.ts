const fs = require("fs");
const path = require("path");
import VueLogic from "./logics/vue";
import { Framework } from "../constants";

const getFileList = (
  startDir: string,
  filePathList: string[] = []
): string[] => {
  const files: string[] = fs.readdirSync(startDir);
  files.forEach(file => {
    const filePath = path.join(startDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFileList(filePath, filePathList);
    } else {
      filePathList.push(filePath);
    }
  });
  return filePathList;
};

const extractComponentFiles = (
  filePathList: string[],
  logic: (arg: string) => boolean
): string[] => {
  return filePathList.filter(logic);
};

const logicHandler = (framework: Framework): ((arg: string) => boolean) => {
  let logic: (arg: string) => boolean;
  if (framework === Framework.REACT) {
    logic = () => {
      throw Error("Not Implemented!");
    };
  } else if (framework === Framework.ANGULAR) {
    logic = () => {
      throw Error("Not Implemented!");
    };
  } else if (framework === Framework.VUE) {
    logic = VueLogic.isComponent;
  }
  return logic;
};

export default (startDir: string, framework: Framework) =>
  extractComponentFiles(getFileList(startDir), logicHandler(framework));
