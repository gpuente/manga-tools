interface GetFileNameProps {
  title?: string;
  from?: number | string;
  to?: number | string;
  ext?: string;
}

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFileName = (props: GetFileNameProps): string => {
  const {
    to,
    from,
    ext = 'pdf',
    title = 'manga',
  } = props;

  const snakeCaseTitle = title.replace(/\s/g, '_');
  let chaptersInfo = '';

  if (from && to) {
    chaptersInfo = `[${from}-${to}]`;
  }

  return `${snakeCaseTitle}${chaptersInfo}.${ext}`;
};
