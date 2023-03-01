import { Language } from './languages';
import { Chapter, Page, SearchResult } from '../types';

export interface ProviderConfig {
  id: string;
  name: string;
  url?: string;
  debug: boolean;
  tags?: string[];
  languages?: Language[];
}

export abstract class Provider {
  protected _id: string;
  protected _name: string;
  protected _url?: string;
  protected debug: boolean;
  protected _tags: string[];
  protected _languages: Language[];

  constructor(config: ProviderConfig) {
    this._id = config.id;
    this._url = config.url;
    this._name = config.name;
    this.debug = config.debug;
    this._tags = config.tags || [];
    this._languages = config.languages || [];
  }

  public get id() {
    return this._id;
  }

  public get url() {
    return this._url;
  }

  public get name() {
    return this._name;
  }

  public get tags() {
    return this._tags;
  }

  public get languages() {
    return this._languages;
  }

  abstract search(searchValue: string): Promise<SearchResult[]>;
  abstract getChaptersInfo(mangaId: string): Promise<Chapter[]>;
  abstract getChapterPages(chapterId: string): Promise<Page[]>;
}
