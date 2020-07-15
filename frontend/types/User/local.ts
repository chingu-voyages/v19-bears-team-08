export type LocalUser = { token: string } & {
  _id: string;
  activeMember: boolean;
  creationDate: Date;
  email: string;
  hideEmail: boolean;
  isActiveMemmber: boolean;
  isEmailVerified: boolean;
  name: string;
  roles: string[];
};
