import { Order, Comparator } from '@types';

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): Comparator<Key> =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
