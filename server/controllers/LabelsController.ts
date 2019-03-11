import * as Koa from "koa";
import * as Label from "../lib/Label";

interface IStoreRequest {
  storageAccount: string;
  containerName: string;
  filename: string;
  labels: Label.ILabel[];
}

export class LabelsController {
  public static async show(ctx: Koa.Context, account: string, container: string, filename: string) {
    try {
      const labels = await Label.getLabels(account, container, filename);
      ctx.response.body = labels;
    } catch (err) {
      ctx.throw(err);
    }
  }

  public static async store(ctx: Koa.Context) {
    try {
      // White list valid POST params
      const { storageAccount, containerName, filename, labels } = ctx.request.body as IStoreRequest;
      if (storageAccount && containerName && filename && labels) {
        await Label.deleteLabels(storageAccount, containerName, filename);
        ctx.body = await Label.addLabels(storageAccount, containerName, filename, labels);
      } else {
        throw new Error("Invalid POST request");
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
}
