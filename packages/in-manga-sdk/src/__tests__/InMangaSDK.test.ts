import axios from 'axios';

import { InMangaSDK } from '../InMangaSDK';
import { MangaStatus } from '../types';
import { CHAPTERS_NOT_FOUND_RESPONSE, CHAPTERS_RESPONSE, CHAPTER_PAGES_NOT_FOUND_RESPONSE, CHAPTER_PAGES_RESPONSE, SEARCH_AXIOS_NOT_FOUND_RESPONSE, SEARCH_AXIOS_RESPONSE } from './utils';

jest.mock('axios');

describe('InMangaSDK', () => {
  it('should return results for a successful search', async () => {
    const inMangaSDK = new InMangaSDK();
    const searchValue = 'dragon';
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: SEARCH_AXIOS_RESPONSE });

    const result = await inMangaSDK.search(searchValue);

    expect(result.length).toEqual(10);
    expect(result[0].chapters).toEqual(89);
    expect(result[0].name).toEqual('Dragon Ball Super');
    expect(result[0].status).toEqual(MangaStatus.OnGoing);
    expect(result[0].id).toEqual('8605de4e-e860-4f02-b5ff-154ed08fe6ef');
  });

  it('should return empty array for a unsuccessful search', async () => {
    const inMangaSDK = new InMangaSDK();
    const searchValue = 'this manga name does not exist';
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: SEARCH_AXIOS_NOT_FOUND_RESPONSE });

    const result = await inMangaSDK.search(searchValue);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed search', async () => {
    const inMangaSDK = new InMangaSDK();
    const searchValue = 'dragon';
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const result = await inMangaSDK.search(searchValue);

    expect(result.length).toEqual(0);
  });

  it('should return chapters info for a valid manga id', async () => {
    const inMangaSDK = new InMangaSDK();
    const mangaId = '8605de4e-e860-4f02-b5ff-154ed08fe6ef';
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: CHAPTERS_RESPONSE });

    const result = await inMangaSDK.getChaptersInfo(mangaId);

    expect(result.length > 0).toEqual(true);
    expect(result[2].number).toEqual(3);
    expect(result[2].id).toEqual('c5d0b57c-b20b-403f-af1b-e3292206c183');
    expect(result[2].pages).toEqual(16);
  });

  it('should return empty array of chapters for a invalid manga id', async () => {
    const inMangaSDK = new InMangaSDK();
    const mangaId = 'invalid-id';

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: CHAPTERS_NOT_FOUND_RESPONSE });
    const result = await inMangaSDK.getChaptersInfo(mangaId);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed chapters request', async () => {
    const inMangaSDK = new InMangaSDK();
    const mangaId = '8605de4e-e860-4f02-b5ff-154ed08fe6ef';

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    const result = await inMangaSDK.getChaptersInfo(mangaId);

    expect(result.length).toEqual(0);
  });

  it("should return chapter's pages", async () => {
    const inMangaSDK = new InMangaSDK();
    const chapterId = 'c5d0b57c-b20b-403f-af1b-e3292206c183';

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: CHAPTER_PAGES_RESPONSE });
    const result = await inMangaSDK.getChapterPages(chapterId);

    expect(result.length).toEqual(43);
    expect(result[42].id).toEqual('b1e78fa5-15dd-444b-8ff0-a507c4b1e979');
    expect(result[42].number).toEqual(43);
    expect(result[42].url).toEqual('https://inmanga.com/page/getPageImage/?identification=b1e78fa5-15dd-444b-8ff0-a507c4b1e979');
  });

  it('should return empty array of pages for a invalid chapter id', async () => {
    const inMangaSDK = new InMangaSDK();
    const chapterId = 'invalid-id';

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: CHAPTER_PAGES_NOT_FOUND_RESPONSE });
    const result = await inMangaSDK.getChapterPages(chapterId);

    expect(result.length).toEqual(0);
  });

  it('should return empty array for a failed pages request', async () => {
    const inMangaSDK = new InMangaSDK();
    const chapterId = 'c5d0b57c-b20b-403f-af1b-e3292206c183';

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    const result = await inMangaSDK.getChapterPages(chapterId);

    expect(result.length).toEqual(0);
  });
});
