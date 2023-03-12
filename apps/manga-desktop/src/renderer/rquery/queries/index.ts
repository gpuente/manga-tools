import { InMangaProvider, SearchResult, Manga } from 'manga-providers';
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

export const getMangaInfo = (
  url: string
): UseQueryOptions<Manga | null, Error> => ({
  queryKey: ['getMangaInfo', url],
  enabled: url !== '',
  initialData: null,
  queryFn: async () => {
    const results = await inMangaProvider.getMangaInfo(url);
    return results;
  },
});
