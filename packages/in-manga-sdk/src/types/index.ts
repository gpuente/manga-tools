export enum MangaStatus {
  OnGoing = 'OnGoing',
  Finished = 'Finished',
  Unknown = 'Unknown',
}

export interface SearchResult {
  id: string;
  name?: string;
  chapters?: number;
  status?: MangaStatus;
}
