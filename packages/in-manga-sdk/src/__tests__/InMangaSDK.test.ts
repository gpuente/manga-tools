import axios from 'axios';

import { InMangaSDK } from '../InMangaSDK';
import { MangaStatus } from '../types';
import { SEARCH_AXIOS_NOT_FOUND_RESPONSE, SEARCH_AXIOS_RESPONSE } from './utils';

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
});
