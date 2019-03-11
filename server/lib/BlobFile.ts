import { blobDb } from "./Database";

export interface IBlobFile {
  name: string;
  // isDirectory: boolean;
  // size: string;
  // mtime: string;
  contentType: string;
  contentLength: string;
  // path: string;
}

export const download = async (account: string, container: string, filename: string) => {
  return blobDb.obj(account, container, filename).abs();
};
