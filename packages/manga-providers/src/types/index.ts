export enum MangaStatus {
  OnGoing = 'OnGoing',
  Finished = 'Finished',
  Unknown = 'Unknown',
}

export enum MangaReleaseFrequency {
  NA = 'NA',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Unknown = 'Unknown',
}

export interface SearchResult {
  id: string;
  url: string;
  name?: string;
  image?: string;
  chapters?: number;
  lastRelease?: Date;
  status?: MangaStatus;
  releaseFrequency?: MangaReleaseFrequency;
}

export interface Chapter {
  id: string;
  name?: string;
  number: number;
  pages: number;
}

export interface Page {
  id: string;
  url: string;
  number: number;
}

export interface FullChapter extends Chapter {
  pagesMetadata: Page[];
}

export interface Manga extends SearchResult {
  description?: string;
}
