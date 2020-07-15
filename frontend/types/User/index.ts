import { LocalUser } from './local';
import { GithubUser } from './github';

export type UserType = {
  local: LocalUser;
  github?: GithubUser;
};

export { LocalUser, GithubUser };
