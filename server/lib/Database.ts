import * as path from "path";
import * as objs from "./ObjectStorage";

class DatabaseEntity {
  constructor(private readonly key: string) {}

  public get = <T>() => {
    const result = objs.readObject(this.key);
    if (!result) {
      return undefined;
    }
    return JSON.parse(result.toString("utf-8")) as T;
  };

  public set = <T>(value: T) => {
    if (!value) {
      objs.deleteObject(this.key);
    } else {
      objs.storeObject(this.key, JSON.stringify(value));
    }
    return value;
  };

  public abs = () => objs.absolutePath(this.key);

  public remove = () => {
    return objs.deleteObject(this.key);
  };

  public list = () => {
    return objs.listObject(this.key);
  };

  public listWithMeta = () => {
    return objs.listObjectWithMeta(this.key);
  };
}

class Database {
  constructor(private readonly tableName: string) {}

  public obj = (...key: string[]) => {
    const fullKey = path.join(this.tableName, key.join("/"));
    return new DatabaseEntity(fullKey);
  };
}

export const blobDb = new Database("blobs");
export const labelDb = new Database("labels");
