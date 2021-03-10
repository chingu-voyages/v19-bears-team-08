type Token = { token: string };

export type LocalUser = {
  _id: string;
  name: string;
  email: string;
  creationDate: Date;
  hideEmail: boolean;
  isActiveMember: boolean;
  isEmailVerified: boolean;
  roles: string[];
  github?: {
    id: string;
    username: string;
  };
  discord?: {
    id: string;
    username: string;
  };
};

// https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
};

export type UserType = {
  local: Token & LocalUser;
  github?: Token & GithubUser;
};
