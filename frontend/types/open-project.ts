export type OpenProjectChinguTypes = {
  _id: string;
  repoName: string;
  repoOwnerName: string;
  chinguOwnerId: string;
};

export type OpenProjectGithubTypes = {
  ownerUrl: string;
  ownerName: string;
  ownerImg: string;
  repoName: string;
  description: string;
  issueCount: number;
  language: string;
  liveUrl: string;
  repoUrl: string;
  lastUpdated: string;
};

export type OpenProjectCardTypes = {
  chingu: OpenProjectChinguTypes;
  github?: OpenProjectGithubTypes;
};
