import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Order } from '@types';
import { Chapter } from 'manga-providers';
import TableBody from '@mui/material/TableBody';
import { getComparator } from '@utils/sorting';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

import {
  EnhancedTableHead,
  EnhancedTableHeadProps,
} from '../EnhancedTableHead';
import * as styles from './styles';

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 50;

export interface ChaptersTableProps {
  page?: number;
  chapters: Chapter[];
  initialOrder?: Order;
  rowsPerPage?: number;
  initialOrderBy: React.Key;
  headCells: EnhancedTableHeadProps['cells'];
}

export const ChaptersTable: React.FC<ChaptersTableProps> = (props) => {
  const {
    chapters,
    headCells,
    initialOrder,
    initialOrderBy,
    page = DEFAULT_PAGE,
    rowsPerPage = DEFAULT_ROWS_PER_PAGE,
  } = props;

  const [order, setOrder] = useState<Order>(initialOrder || 'asc');
  const [orderBy, setOrderBy] = useState<React.Key>(initialOrderBy);
  const [selected, setSelected] = useState<React.Key[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [dense, setDense] = useState(false);

  const isSelected = useCallback(
    (id: React.Key) => selected.indexOf(id) !== -1,
    [selected]
  );

  const selectAll = () => setSelected(chapters.map((chapter) => chapter.id));

  const handleRowSelection = useCallback(
    (id: React.Key) => {
      let newSelected = [];
      const isRowSelected = isSelected(id);

      if (isRowSelected) {
        newSelected = selected.filter((rowId) => rowId !== id);
      } else {
        newSelected = [...selected, id];
      }

      setSelected(newSelected);
    },
    [selected, isSelected]
  );

  const handleRequestSort: EnhancedTableHeadProps['onRequestSort'] = (
    event,
    id
  ) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const rows = chapters
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paperContainer}>
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              checked={false}
              indeterminate={false}
              onChange={selectAll}
              onRequestSort={handleRequestSort}
              orderBy={orderBy}
              order={order}
              cells={headCells}
            />
            <TableBody>
              {rows.map((row) => {
                const isRowSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isRowSelected}
                    sx={styles.cursorPointer}
                    aria-checked={isRowSelected}
                    onClick={() => handleRowSelection(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isRowSelected} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={row.id}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.pages}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
