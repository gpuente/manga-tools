import axios from 'axios';

import { InMangaProvider } from '../providers/InMangaProvider';
import { MangaStatus, MangaReleaseFrequency } from '../types';
import {
  CHAPTERS_RESPONSE,
  AXIOS_MANGA_RESPONSE,
  SEARCH_AXIOS_RESPONSE,
  CHAPTER_PAGES_RESPONSE,
  CHAPTERS_NOT_FOUND_RESPONSE,
  AXIOS_MANGA_CHAPTERS_RESPONSE,
  SEARCH_AXIOS_NOT_FOUND_RESPONSE,
  CHAPTER_PAGES_NOT_FOUND_RESPONSE,
} from './utils';

jest.mock('axios');

describe('InMangaProvider', () => {
  let inMangaProvider: InMangaProvider;

  beforeEach(() => {
    inMangaProvider = new InMangaProvider();
  });

  it('should return results for a successful search', async () => {
    const searchValue = 'dragon';
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: SEARCH_AXIOS_RESPONSE,
    });

    const result = await inMangaProvider.search(searchValue);

    expect(result.length).toEqual(10);
    expect(result[0].chapters).toEqual(89);
    expect(result[0].name).toEqual('Dragon Ball Super');
    expect(result[0].status).toEqual(MangaStatus.OnGoing);
    expect(result[0].id).toEqual('8605de4e-e860-4f02-b5ff-154ed08fe6ef');
    expect(result[0].releaseFrequency).toEqual(MangaReleaseFrequency.Monthly);
    expect(result[0].url).toEqual(
      'https://inmanga.com/ver/manga/dragon-ball-super/8605de4e-e860-4f02-b5ff-154ed08fe6ef'
    );
    expect(result[0].lastRelease).toEqual(
      new Date(Date.UTC(2023, 0, 19, 0, 0, 0, 0))
    );
    expect(result[0].image).toEqual(
      'https://pack-yak.intomanga.com/thumbnails/manga/Dragon-Ball-Super/8605de4e-e860-4f02-b5ff-154ed08fe6ef'
    );
  });

  it('should return empty array for a unsuccessful search', async () => {
    const searchValue = 'this manga name does not exist';
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: SEARCH_AXIOS_NOT_FOUND_RESPONSE,
    });

    const result = await inMangaProvider.search(searchValue);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed search', async () => {
    const searchValue = 'dragon';
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const result = await inMangaProvider.search(searchValue);

    expect(result.length).toEqual(0);
  });

  it('should return chapters info for a valid manga id', async () => {
    const mangaId = '8605de4e-e860-4f02-b5ff-154ed08fe6ef';
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: CHAPTERS_RESPONSE });

    const result = await inMangaProvider.getChaptersInfo(mangaId);

    expect(result.length > 0).toEqual(true);
    expect(result[2].number).toEqual(3);
    expect(result[2].id).toEqual('c5d0b57c-b20b-403f-af1b-e3292206c183');
    expect(result[2].pages).toEqual(16);
  });

  it('should return empty array of chapters for a invalid manga id', async () => {
    const mangaId = 'invalid-id';

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: CHAPTERS_NOT_FOUND_RESPONSE,
    });
    const result = await inMangaProvider.getChaptersInfo(mangaId);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed chapters request', async () => {
    const mangaId = '8605de4e-e860-4f02-b5ff-154ed08fe6ef';

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    const result = await inMangaProvider.getChaptersInfo(mangaId);

    expect(result.length).toEqual(0);
  });

  it("should return chapter's pages", async () => {
    const chapterId = 'c5d0b57c-b20b-403f-af1b-e3292206c183';

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: CHAPTER_PAGES_RESPONSE,
    });
    const result = await inMangaProvider.getChapterPages(chapterId);

    expect(result.length).toEqual(43);
    expect(result[42].id).toEqual('b1e78fa5-15dd-444b-8ff0-a507c4b1e979');
    expect(result[42].number).toEqual(43);
    expect(result[42].url).toEqual(
      'https://inmanga.com/page/getPageImage/?identification=b1e78fa5-15dd-444b-8ff0-a507c4b1e979'
    );
  });

  it('should return empty array of pages for a invalid chapter id', async () => {
    const chapterId = 'invalid-id';

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: CHAPTER_PAGES_NOT_FOUND_RESPONSE,
    });
    const result = await inMangaProvider.getChapterPages(chapterId);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed pages request', async () => {
    const chapterId = 'c5d0b57c-b20b-403f-af1b-e3292206c183';

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    const result = await inMangaProvider.getChapterPages(chapterId);

    expect(result.length).toEqual(0);
  });

  it('should return a date from text', () => {
    const date1 = InMangaProvider.getDateFromText('21/02/2023');
    const date2 = InMangaProvider.getDateFromText('14/05/2017');
    const date3 = InMangaProvider.getDateFromText('08/01/2018');

    expect(date1).toEqual(new Date('2023-02-21'));
    expect(date2).toEqual(new Date('2017-05-14'));
    expect(date3).toEqual(new Date('2018-01-08'));
  });

  it('should return undefined for wrong date text', () => {
    const date1 = InMangaProvider.getDateFromText('//');
    const date2 = InMangaProvider.getDateFromText('1969/01/01');
    const date3 = InMangaProvider.getDateFromText('2000/0/12');
    const date4 = InMangaProvider.getDateFromText('2000/2/32');
    const date5 = InMangaProvider.getDateFromText('2000/2/0');
    const date6 = InMangaProvider.getDateFromText('');

    expect(date1).toBeUndefined();
    expect(date2).toBeUndefined();
    expect(date3).toBeUndefined();
    expect(date4).toBeUndefined();
    expect(date5).toBeUndefined();
    expect(date6).toBeUndefined();
  });

  it('should return valid manga frequency from text', () => {
    const frequency1 = InMangaProvider.getReleaseFrequencyFromText(' Mensual');
    const frequency2 = InMangaProvider.getReleaseFrequencyFromText('Semanal');
    const frequency3 = InMangaProvider.getReleaseFrequencyFromText('');

    expect(frequency1).toEqual(MangaReleaseFrequency.Monthly);
    expect(frequency2).toEqual(MangaReleaseFrequency.Weekly);
    expect(frequency3).toEqual(MangaReleaseFrequency.Unknown);
  });

  it('should return valid manga title string url', () => {
    const string1 = InMangaProvider.titleToUrlString(
      'Super Dragon Ball Heroes: Universe Mission!'
    );
    const string2 = InMangaProvider.titleToUrlString(
      '  Fairy Tail: La misión de los 100 años   '
    );

    expect(string1).toEqual('super-dragon-ball-heroes-universe-mission');
    expect(string2).toEqual('fairy-tail-la-misión-de-los-100-años');
  });

  it('should return manga data from url', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: AXIOS_MANGA_RESPONSE,
    });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: AXIOS_MANGA_CHAPTERS_RESPONSE,
    });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: CHAPTER_PAGES_RESPONSE,
    });

    const url =
      'https://inmanga.com/ver/manga/Dragon-Ball-Super/8605de4e-e860-4f02-b5ff-154ed08fe6ef';

    const result = await inMangaProvider.getMangaInfo(url);

    expect(result.id).toEqual('8605de4e-e860-4f02-b5ff-154ed08fe6ef');
    expect(result.url).toEqual(url);
    expect(result.name).toEqual('Dragon Ball Super');
    expect(result.status).toEqual(MangaStatus.OnGoing);
    expect(result.description).toEqual(
      'Dragon Ball Super es la secuela del Manga y anime de Dragon Ball Z después de la Saga de Majin Buu, y está enlazada con las películas Dragon Ball Z: La Batalla de los Dioses y Dragon Ball Z: La Resurrección de F.'
    );
  });
});
