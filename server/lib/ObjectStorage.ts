import * as fs from "fs";
import { mkdirpSync } from "fs-extra";
import * as path from "path";

const rootPath = "objs";

export const absolutePath = (key: string) => path.join(rootPath, key);

export const storeObject = (key: string, buffer: Buffer | string) => {
  const fullPath = absolutePath(key);
  const directory = path.dirname(fullPath);
  mkdirpSync(directory);
  fs.writeFileSync(fullPath, buffer);
};

export const readObject = (key: string) => {
  const fullPath = absolutePath(key);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  return fs.readFileSync(fullPath);
};

export const deleteObject = (key: string) => {
  const fullPath = absolutePath(key);
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  fs.unlinkSync(fullPath);
  return true;
};

export const listObject = (key: string) => {
  const parentPath = absolutePath(key);
  if (!fs.existsSync(parentPath)) {
    return [];
  }
  return fs.readdirSync(parentPath);
};

export const listObjectWithMeta = (key: string) => {
  const parentPath = absolutePath(key);
  if (!fs.existsSync(parentPath)) {
    return [];
  }
  return fs.readdirSync(parentPath).map(fileName => {
    const fullPath = path.join(parentPath, fileName);
    const stat = fs.lstatSync(fullPath);
    return {
      key: fileName,
      size: stat.size,
      modified: stat.mtime,
    };
  });
};
