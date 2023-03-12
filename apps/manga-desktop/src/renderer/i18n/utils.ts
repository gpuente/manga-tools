import { MangaStatus, MangaReleaseFrequency } from 'manga-providers';

export function getMangaStatusKey(status?: MangaStatus): string {
  switch (status) {
    case MangaStatus.Finished:
      return 'mangaStatus.finished';
    case MangaStatus.OnGoing:
      return 'mangaStatus.onGoing';
    default:
      return 'mangaStatus.unknown';
  }
}

export function getMangaReleaseFrequencyKey(
  releaseFrequency?: MangaReleaseFrequency
): string {
  switch (releaseFrequency) {
    case MangaReleaseFrequency.Monthly:
      return 'mangaFrequency.monthly';
    case MangaReleaseFrequency.Weekly:
      return 'mangaFrequency.weekly';
    case MangaReleaseFrequency.NA:
      return 'mangaFrequency.na';
    default:
      return 'mangaFrequency.unknown';
  }
}
