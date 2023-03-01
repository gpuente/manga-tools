import axios from 'axios';
import { load } from 'cheerio';

import { Provider, Language } from '../base';
import { Chapter, Page, SearchResult } from '../types';
import { getMangaStatus, normalizeText } from '../utils';

const RESULTS_QTY = 30;
const PROVIDER_URL = 'https://inmanga.com';
const THUMBNAIL_URL = 'https://pack-yak.intomanga.com';
const SEARCH_URL = `${PROVIDER_URL}/manga/getMangasConsultResult`;
const PAGE_URL = `${PROVIDER_URL}/page/getPageImage/?identification={{page_id}}`;
const CHAPTERS_URL = `${PROVIDER_URL}/chapter/getall?mangaIdentification={{manga_id}}`;
const PROVIDER_REFERER_URL = `${PROVIDER_URL}/manga/consult?suggestion={{search_value}}`;
const CHAPTER_PAGES_URL = `${PROVIDER_URL}/chapter/chapterIndexControls?identification={{chapter_id}}`;
const SARCH_DATA_STRING = `filter[generes][]=-1&filter[queryString]={{search_value}}&filter[skip]=0&filter[take]=${RESULTS_QTY}&filter[sortby]=1&filter[broadcastStatus]=0&filter[onlyFavorites]=false&d=`;

export class InMangaProvider extends Provider {
  constructor(debug = false) {
    super({
      debug,
      id: 'in-manga',
      name: 'InManga',
      url: PROVIDER_URL,
      languages: [Language.Spanish],
      tags: ['inmanga', 'spanish', 'popular'],
    });
  }

  async search(searchValue: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const data = SARCH_DATA_STRING.replace('{{search_value}}', searchValue);

    try {
      const res = await axios.post(SEARCH_URL, encodeURI(data), {
        headers: {
          origin: PROVIDER_URL,
          referer: PROVIDER_REFERER_URL.replace(
            '{{search_value}}',
            searchValue
          ),
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      });

      const bodyResponse = load(res.data);

      bodyResponse('a.manga-result').each((index, el) => {
        const id = el.attribs.href.split('/').pop();
        const title = load(el)('h4.ellipsed-text').text();
        const chapters = load(el)('span.label.label-info.pull-right').text();
        const thumbnailUrl = load(el)('img.img-responsive').attr('data-src');
        const status = load(el)(
          'span.label.label-success.pull-right, span.label.label-danger.pull-right'
        ).text();

        if (id) {
          results.push({
            id,
            name: normalizeText(title),
            status: getMangaStatus(normalizeText(status)),
            chapters: Number(normalizeText(chapters)),
            ...(thumbnailUrl && { image: `${THUMBNAIL_URL}${thumbnailUrl}` }),
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
      const res = await axios.get(
        CHAPTERS_URL.replace('{{manga_id}}', mangaId)
      );

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
      const res = await axios.get(
        CHAPTER_PAGES_URL.replace('{{chapter_id}}', chapterId)
      );
      const bodyResponse = load(res.data);

      bodyResponse('#PageList:first > option').each((index, el) => {
        const number = load(el).text();
        const id = el.attribs.value;

        pages.push({
          id,
          number: Number(number),
          url: PAGE_URL.replace('{{page_id}}', id),
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
