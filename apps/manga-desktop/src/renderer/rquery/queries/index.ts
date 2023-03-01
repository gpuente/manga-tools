import { InMangaProvider } from 'manga-providers';
import { UseQueryOptions } from '@tanstack/react-query';

const inMangaProvider = new InMangaProvider();

export const searchMangaByName = (searchValue: string): UseQueryOptions => ({
  queryKey: ['searchMangaByName', searchValue],
  enabled: searchValue !== '',
  queryFn: async () => {
    const results = await inMangaProvider.search(searchValue);
    return results;
  },
});
