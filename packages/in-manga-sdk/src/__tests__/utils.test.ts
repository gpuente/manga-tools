import { normalizeText, getMangaStatus } from '../utils';

describe('utils -> normalizeText', () => {
  it('should normalize text', () => {
    expect(normalizeText('  Hello   World  ')).toBe('Hello World');
  });
});

describe('utils -> getMangaStatus', () => {
  it('should return MangaStatus.OnGoing', () => {
    expect(getMangaStatus('En emisión')).toBe('OnGoing');
  });

  it('should return MangaStatus.Finished', () => {
    expect(getMangaStatus('Finalizado')).toBe('Finished');
  });

  it('should return MangaStatus.Unknown', () => {
    expect(getMangaStatus('Unknown')).toBe('Unknown');
  });
});
