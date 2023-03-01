import { MangaStatus } from '../types';

export const normalizeText = (text: string) => text.trim().replace(/\s+/g, ' ');

export const getMangaStatus = (status: string): MangaStatus => {
  switch (status.toLowerCase()) {
    case 'en emisión':
      return MangaStatus.OnGoing;
    case 'finalizado':
      return MangaStatus.Finished;
    default:
      return MangaStatus.Unknown;
  }
};
