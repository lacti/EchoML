import * as Koa from "koa";
import * as BlobContainer from "../lib/BlobContainer";
import * as BlobService from "../lib/BlobService";
import * as User from "../lib/User";
import { Logger } from "../Logger";

export class ContainersController {
  public static async index(ctx: Koa.Context) {
    const containers: BlobContainer.IBlobContainer[] = await ContainersController.getAllContainers(
      ctx,
    );
    ctx.response.body = containers;
  }

  public static async show(ctx: Koa.Context, name: string) {
    const containers: BlobContainer.IBlobContainer[] = await ContainersController.getAllContainers(
      ctx,
    );
    const match = containers.find(container => !!container.name.match(new RegExp(name, "i")));

    if (match) {
      ctx.response.body = match;
    } else {
      ctx.response.status = 404;
    }
  }

  public static async blobs(ctx: Koa.Context, name: string) {
    const containers: BlobContainer.IBlobContainer[] = await ContainersController.getAllContainers(
      ctx,
    );
    const match = containers.find(container => !!container.name.match(new RegExp(name, "i")));

    if (match) {
      const blobs = await BlobContainer.getBlobs(match);
      ctx.response.body = blobs;
    } else {
      ctx.response.status = 404;
    }
  }

  public static async labels(ctx: Koa.Context, name: string) {
    const containers: BlobContainer.IBlobContainer[] = await ContainersController.getAllContainers(
      ctx,
    );
    const match = containers.find(container => !!container.name.match(new RegExp(name, "i")));

    if (match) {
      const labels = await BlobContainer.getLabels(match);
      ctx.response.body = labels;
    } else {
      ctx.response.status = 404;
    }
  }

  private static async getAllContainers(ctx: Koa.Context): Promise<BlobContainer.IBlobContainer[]> {
    const containers: BlobContainer.IBlobContainer[] = [];
    try {
      containers.push(...(await BlobContainer.getAllContainers()));
      const user = await User.getUser(ctx.state.user.email);
      if (user) {
        for (const account of user.storageAccounts || []) {
          const userContainers = await BlobService.getContainers(account.name, account.accessKey);
          containers.push(...userContainers);
        }
      }
    } catch (err) {
      Logger.logger.error(err);
    }
    return containers;
  }
}
