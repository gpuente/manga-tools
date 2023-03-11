import { InMangaProvider, SearchResult } from 'manga-providers';
import { UseQueryOptions } from '@tanstack/react-query';

const inMangaProvider = new InMangaProvider();

export const searchMangaByName = (
  searchValue: string
): UseQueryOptions<SearchResult[], Error> => ({
  queryKey: ['searchMangaByName', searchValue],
  enabled: searchValue !== '',
  initialData: [],
  queryFn: async () => {
    const results = await inMangaProvider.search(searchValue);
    return results;
  },
});
