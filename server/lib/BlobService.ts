import { Logger } from "../Logger";
import { IBlobContainer } from "./BlobContainer";

export interface IBlobService {
  name: string;
  accessKey: string;
}

export const getContainers = async (
  accountName: string,
  _accountKey: string,
): Promise<IBlobContainer[]> => {
  Logger.logger.info(`No containers for account: ${accountName}`);
  return [];
};
