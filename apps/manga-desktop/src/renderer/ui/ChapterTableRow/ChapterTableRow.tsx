import React from 'react';
import { Chapter } from 'manga-providers';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import * as styles from './styles';
import { BaseRowComponent } from '../SelectableTable';

export type ChapterTableRowProps = BaseRowComponent & Chapter;

export const ChapterTableRow: React.FC<ChapterTableRowProps> = ({
  id,
  name,
  pages,
  number,
  selected,
  handleRowSelection,
}) => (
  <TableRow
    hover
    tabIndex={-1}
    role="checkbox"
    selected={selected}
    sx={styles.cursorPointer}
    aria-checked={selected}
    onClick={() => handleRowSelection(id)}
  >
    <TableCell padding="checkbox">
      <Checkbox color="primary" checked={selected} />
    </TableCell>
    <TableCell component="th" id={id} scope="row" padding="none">
      {id}
    </TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{number}</TableCell>
    <TableCell>{pages}</TableCell>
  </TableRow>
);
