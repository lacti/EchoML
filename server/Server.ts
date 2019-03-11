import * as config from "config";
import * as fs from "fs";
import * as https from "https";
import * as cors from "kcors";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as morgan from "koa-morgan";
import * as _ from "koa-route";
import * as serve from "koa-static";
import { API } from "./API";
import { Logger } from "./Logger";

export class Server {
  public app: Koa = new Koa();

  constructor() {
    const stream = {
      write(message: string) {
        Logger.logger.info(message.slice(0, -1));
      },
    };
    this.app.use(morgan("combined", { stream }));

    if (config.has("cors")) {
      if (config.get<boolean>("cors")) {
        this.app.use(cors({ credentials: true }));
      }
    }

    this.app.use(bodyParser());

    // Serve build folder containing static assets
    this.app.use(serve("build"));
    // Audio files
    this.app.use(serve("files"));

    // Router routes middleware
    for (const route of API.routes) {
      this.app.use(route);
    }
  }

  public listen(hostname: string, port: number) {
    if (fs.existsSync("cert")) {
      const options = {
        cert: fs.readFileSync("cert/this.crt"),
        key: fs.readFileSync("cert/this.key"),
      };
      https.createServer(options, this.app.callback()).listen(port);
      Logger.logger.info(`Server started on ${hostname}:${port}(https) in ${this.app.env} mode`);
    } else {
      this.app.listen(port, hostname);
      Logger.logger.info(`Server started on ${hostname}:${port} in ${this.app.env} mode`);
    }
  }
}
