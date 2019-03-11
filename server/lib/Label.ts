import { labelDb } from "./Database";

export interface ILabel {
  start: number;
  end: number;
  label: string;
}

export const getLabels = async (
  account: string,
  container: string,
  filename: string,
): Promise<ILabel[]> => {
  return labelDb.obj(account, container, `${filename}_label.json`).get<ILabel[]>() || [];
};

export const deleteLabels = async (
  account: string,
  container: string,
  filename: string,
): Promise<void> => {
  labelDb.obj(account, container, `${filename}_label.json`).remove();
};

export const addLabels = async (
  account: string,
  container: string,
  filename: string,
  labels: ILabel[],
): Promise<ILabel[]> => {
  const docs: ILabel[] = labels.map(label => ({
    end: label.end,
    label: label.label,
    start: label.start,
  }));
  return labelDb.obj(account, container, `${filename}_label.json`).set(docs);
};
