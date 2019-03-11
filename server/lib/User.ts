export interface IUser {
  email: string;
  password: string;
  storageAccounts: Array<{ name: string; accessKey: string }>;
}

const rootUser: IUser = {
  email: "admin",
  password: "1234",
  storageAccounts: [
    {
      name: "default",
      accessKey: "1234",
    },
  ],
};

export const getUser = (..._args: any[]) => Promise.resolve(rootUser);
