import { InMangaSDK } from 'in-manga-sdk';
import { UseQueryOptions } from '@tanstack/react-query';

const inMangaSDK = new InMangaSDK();

export const searchMangaByName = (searchValue: string): UseQueryOptions => ({
  queryKey: ['searchMangaByName', searchValue],
  enabled: searchValue !== '',
  queryFn: async () => {
    const results = await inMangaSDK.search(searchValue);
    return results;
  },
});
