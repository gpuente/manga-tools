import React from 'react';
import { getMangaInfo } from '@/rquery/queries';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

export const MangaPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const url = searchParams.get('url');
  const { data, isLoading, error } = useQuery(getMangaInfo(url));

  return (
    <div>
      <h1>Manga Page</h1>
      <div>Path: {location.pathname + location.search}</div>
      <div>URL: {decodeURI(url || '')}</div>
      <div>isLoading: {isLoading ? 'true' : 'false'}</div>
      <div>error: {error?.message}</div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
