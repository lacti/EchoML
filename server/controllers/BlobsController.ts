import * as Koa from "koa";
import * as send from "koa-send";
import * as BlobContainer from "../lib/BlobContainer";
import * as BlobFile from "../lib/BlobFile";
import * as BlobService from "../lib/BlobService";
import * as User from "../lib/User";
import { Logger } from "../Logger";

export class BlobsController {
  public static async index(ctx: Koa.Context) {
    const user = await User.getUser(ctx.state.user.email);
    const files: BlobFile.IBlobFile[] = [];
    if (user) {
      const accounts: BlobService.IBlobService[] = user.storageAccounts;

      const containers = (await Promise.all([
        BlobContainer.getAllContainers(),
        ...accounts.map(account => BlobService.getContainers(account.name, account.accessKey)),
      ])).reduce((flat, list) => flat.concat(list), []);

      const blobs = (await Promise.all(
        containers.map(container => BlobContainer.getBlobs(container)),
      )).reduce((flat, list) => flat.concat(list), []);

      for (const blob of blobs) {
        files.push(blob);
      }
    }
    ctx.response.body = files;
  }

  public static async download(
    ctx: Koa.Context,
    account: string,
    container: string,
    filename: string,
  ) {
    try {
      const filepath = await BlobFile.download(account, container, filename);
      Logger.logger.info(filepath);
      await send(ctx, filepath);
    } catch (err) {
      ctx.throw(err);
    }
  }
}
