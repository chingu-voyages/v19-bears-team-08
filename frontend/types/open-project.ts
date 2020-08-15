export type OpenProject = {
  _id?: string;
  ownerId?: string;
  link?: string;
};

export type OpenProjectRepoDeets = {
  ownerUrl?: string;
  ownerName?: string;
  ownerImg?: string;
  repoName?: string;
  description?: string;
  issueCount?: number;
  language?: string;
  liveUrl?: string;
  repoUrl?: string;
  lastUpdated?: string;
};
export type OpenProjectCard = OpenProject &
  OpenProjectRepoDeets & { isLoadingRepoDeets?: boolean };
