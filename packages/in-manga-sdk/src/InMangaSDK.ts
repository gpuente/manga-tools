import axios from 'axios';
import { load } from 'cheerio';
import { Chapter, Page, SearchResult } from './types';
import { getMangaStatus, normalizeText } from './utils';

export class InMangaSDK {
  private PROVIDER_URL = 'https://inmanga.com';

  private PROVIDER_REFERER_URL = `${this.PROVIDER_URL}/manga/consult?suggestion={{search_value}}`;

  private SEARCH_URL = `${this.PROVIDER_URL}/manga/getMangasConsultResult`;

  private SARCH_DATA_STRING = 'filter[generes][]=-1&filter[queryString]={{search_value}}&filter[skip]=0&filter[take]=10&filter[sortby]=1&filter[broadcastStatus]=0&filter[onlyFavorites]=false&d=';

  private CHAPTERS_URL = `${this.PROVIDER_URL}/chapter/getall?mangaIdentification={{manga_id}}`;

  private CHAPTER_PAGES_URL = `${this.PROVIDER_URL}/chapter/chapterIndexControls?identification={{chapter_id}}`;

  private PAGE_URL = `${this.PROVIDER_URL}/page/getPageImage/?identification={{page_id}}`;

  private debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  async search(searchValue: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const data = this.SARCH_DATA_STRING.replace('{{search_value}}', searchValue);

    try {
      const res = await axios.post(this.SEARCH_URL, encodeURI(data), {
        headers: {
          origin: this.PROVIDER_URL,
          referer: this.PROVIDER_REFERER_URL.replace('{{search_value}}', searchValue),
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      });

      const bodyResponse = load(res.data);

      bodyResponse('a.manga-result').each((index, el) => {
        const id = el.attribs.href.split('/').pop();
        const title = load(el)('h4.ellipsed-text').text();
        const chapters = load(el)('span.label.label-info.pull-right').text();
        const status = load(el)('span.label.label-success.pull-right, span.label.label-danger.pull-right').text();

        if (id) {
          results.push({
            id,
            name: normalizeText(title),
            status: getMangaStatus(normalizeText(status)),
            chapters: Number(normalizeText(chapters)),
          });
        }
      });
    } catch (error) {
      if (this.debug) {
        console.error(error);
      }
    }

    return results;
  }

  async getChaptersInfo(mangaId: string): Promise<Chapter[]> {
    const chapters: Chapter[] = [];

    try {
      const res = await axios.get(this.CHAPTERS_URL.replace('{{manga_id}}', mangaId));

      const chaptersData = JSON.parse(res.data.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chaptersData.result.forEach((chapter: any) => {
        if (chapter.Identification && chapter.PagesCount && chapter.Number) {
          chapters.push({
            id: chapter.Identification,
            name: chapter.FriendlyMangaName,
            number: chapter.Number,
            pages: chapter.PagesCount,
          });
        }
      });
    } catch (error) {
      if (this.debug) {
        console.error(error);
      }
    }

    return chapters.sort((a, b) => a.number - b.number);
  }

  async getChapterPages(chapterId: string): Promise<Page[]> {
    const pages: Page[] = [];

    try {
      const res = await axios.get(this.CHAPTER_PAGES_URL.replace('{{chapter_id}}', chapterId));
      const bodyResponse = load(res.data);

      bodyResponse('#PageList:first > option').each((index, el) => {
        const number = load(el).text();
        const id = el.attribs.value;

        pages.push({
          id,
          number: Number(number),
          url: this.PAGE_URL.replace('{{page_id}}', id),
        });
      });
    } catch (error) {
      if (this.debug) {
        console.error(error);
      }
    }

    return pages;
  }
}
