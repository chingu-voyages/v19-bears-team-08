export type LocalUser = { token: string } & {
  _id: string;
  creationDate: Date;
  email: string;
  hideEmail: boolean;
  isActiveMember: boolean;
  isEmailVerified: boolean;
  name: string;
  roles: string[];
};
