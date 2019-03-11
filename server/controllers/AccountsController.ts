import * as Koa from "koa";
import { IBlobService } from "../lib/BlobService";
import * as User from "../lib/User";

export class AccountsController {
  public static async index(ctx: Koa.Context) {
    const user = await User.getUser(ctx.state.user.email);
    const accounts: IBlobService[] = user ? user.storageAccounts : [];
    ctx.response.body = accounts;
  }
}
