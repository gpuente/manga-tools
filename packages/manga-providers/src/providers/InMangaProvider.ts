import axios from 'axios';
import { load } from 'cheerio';

import { Provider, Language } from '../base';
import {
  Page,
  Manga,
  Chapter,
  MangaStatus,
  FullChapter,
  SearchResult,
  MangaReleaseFrequency,
} from '../types';
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
const MANGA_URL = `${PROVIDER_URL}/ver/manga/{{manga_name}}/{{manga_id}}`;

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

  static getDateFromText(text: string): Date | undefined {
    const [_day, _month, _year] = normalizeText(text).split('/');

    const year = Number(_year);
    const month = Number(_month) - 1;
    const day = Number(_day);

    if (year < 1970) {
      return undefined;
    }

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      return undefined;
    }

    if (month < 0 || month > 11) {
      return undefined;
    }

    if (day < 1 || day > 31) {
      return undefined;
    }

    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  }

  static getReleaseFrequencyFromText(text: string): MangaReleaseFrequency {
    switch (normalizeText(text.toLowerCase())) {
      case 'mensual':
        return MangaReleaseFrequency.Monthly;
      case 'semanal':
        return MangaReleaseFrequency.Weekly;
      default:
        return MangaReleaseFrequency.Unknown;
    }
  }

  static titleToUrlString(title: string): string {
    const normalizedTitle = normalizeText(title.toLowerCase());
    return normalizedTitle
      .replace(/[^\p{L}\p{N}\p{M}\s]+/gu, '')
      .replace(/\s/g, '-');
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
        const frequency = load(el)(
          'span.label.label-warning.pull-right'
        ).text();
        const lastRelease = load(el)(
          'span.label.label-primary.pull-right'
        ).text();
        const thumbnailUrl = load(el)('img.img-responsive').attr('data-src');
        const status = load(el)(
          'span.label.label-success.pull-right, span.label.label-danger.pull-right'
        ).text();

        const mangaStatus = getMangaStatus(normalizeText(status));

        if (id) {
          results.push({
            id,
            url: MANGA_URL.replace(
              '{{manga_name}}',
              InMangaProvider.titleToUrlString(title)
            ).replace('{{manga_id}}', id),
            name: normalizeText(title),
            status: mangaStatus,
            lastRelease: InMangaProvider.getDateFromText(lastRelease),
            releaseFrequency:
              mangaStatus === MangaStatus.Finished
                ? MangaReleaseFrequency.NA
                : InMangaProvider.getReleaseFrequencyFromText(frequency),
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

  // eslint-disable-next-line class-methods-use-this
  async getMangaInfo(url: string): Promise<Manga> {
    const res = await axios.get(url);
    const bodyResponse = load(res.data);

    const id = bodyResponse('#Identification').attr('value');
    const title = bodyResponse('div.panel-heading > h1').text();
    const description = bodyResponse(
      'div.manga-index-sinopsis-detail-cover-photo-layout > div > div.panel-body'
    ).text();
    const thumbnailUrl = bodyResponse(
      'div.col-md-3.col-sm-4.manga-index-detail-cover-photo-layout img'
    ).attr('src');
    const status = bodyResponse(
      'div.panel.widget span.label.label-success.pull-right'
    ).text();
    const lastRelease = bodyResponse(
      'div.panel.widget span.label.label-primary.pull-right'
    ).text();
    const releaseFrequency = bodyResponse(
      'div.panel.widget span.label.label-warning.pull-right'
    ).text();

    if (!id) {
      throw new Error('Manga not found');
    }

    const chapters = await this.getChaptersInfo(id);

    const promises = chapters.map(async (chapter) => {
      const pages = await this.getChapterPages(chapter.id);
      const fullChapter: FullChapter = {
        ...chapter,
        pagesMetadata: pages,
      };

      return fullChapter;
    });

    const chapterList = await Promise.all(promises);

    return {
      id,
      url,
      name: title,
      status: getMangaStatus(normalizeText(status)),
      lastRelease: InMangaProvider.getDateFromText(lastRelease),
      releaseFrequency:
        InMangaProvider.getReleaseFrequencyFromText(releaseFrequency),
      chapters: chapterList.length,
      description: normalizeText(description),
      ...(thumbnailUrl && { image: `${THUMBNAIL_URL}${thumbnailUrl}` }),
      chapterList,
    };
  }
}
