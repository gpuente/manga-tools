import axios from 'axios';
import cheerio, { load,  } from 'cheerio';
import { SearchResult } from './types';
import { getMangaStatus, normalizeText } from './utils';

export class InMangaSDK {
  private PROVIDER_URL = 'https://inmanga.com';
  private PROVIDER_REFERER_URL = `${this.PROVIDER_URL}/manga/consult?suggestion={{search_value}}`;
  private SEARCH_URL = `${this.PROVIDER_URL}/manga/getMangasConsultResult`;
  private SARCH_DATA_STRING = 'filter[generes][]=-1&filter[queryString]={{search_value}}&filter[skip]=0&filter[take]=10&filter[sortby]=1&filter[broadcastStatus]=0&filter[onlyFavorites]=false&d=';

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
    } finally {
      return results;
    }
  }
}
