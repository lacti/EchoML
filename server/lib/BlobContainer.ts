import * as mimeTypes from "mime-types";
import * as path from "path";
import { IBlobFile } from "./BlobFile";
import { blobDb, labelDb } from "./Database";
import { ILabel } from "./Label";

export interface IBlobContainer {
  account: string;
  name: string;
  lastModified: string;
  // storageAccount: string;
}

export const getAllContainers = async (): Promise<IBlobContainer[]> => {
  return [
    {
      account: "root",
      name: "default",
      lastModified: Date.now().toString(),
    },
  ];
};

export const getBlobs = async (container: IBlobContainer): Promise<IBlobFile[]> => {
  const blobs: IBlobFile[] = [];
  for (const meta of blobDb.obj(container.account, container.name).listWithMeta()) {
    blobs.push({
      name: path.basename(meta.key),
      contentType: mimeTypes.contentType(path.extname(meta.key)) || "application/octet-stream",
      contentLength: meta.size.toString(),
    });
  }
  return blobs;
};

export const getLabels = async (container: IBlobContainer): Promise<ILabel[]> => {
  const labels: ILabel[] = [];
  for (const labelKey of labelDb.obj(container.account, container.name).list()) {
    const maybeLabel = labelDb.obj(labelKey).get<ILabel>();
    if (maybeLabel) {
      labels.push(maybeLabel);
    }
  }
  return labels;
};
