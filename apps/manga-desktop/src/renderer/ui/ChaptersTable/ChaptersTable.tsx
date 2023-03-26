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
import TablePagination from '@mui/material/TablePagination';

import {
  EnhancedTableHead,
  EnhancedTableHeadProps,
} from '../EnhancedTableHead';
import * as styles from './styles';

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 50;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 30, 50];

export interface ChaptersTableProps {
  initialPage?: number;
  chapters: Chapter[];
  initialOrder?: Order;
  initialRowsPerPage?: number;
  initialOrderBy: React.Key;
  headCells: EnhancedTableHeadProps['cells'];
  rowsPerPageOptions?: number[];
}

export const ChaptersTable: React.FC<ChaptersTableProps> = (props) => {
  const {
    chapters,
    headCells,
    initialOrder,
    initialOrderBy,
    initialPage = DEFAULT_PAGE,
    initialRowsPerPage = DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  } = props;

  const [page, setPage] = useState(initialPage);
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [order, setOrder] = useState<Order>(initialOrder || 'asc');
  const [orderBy, setOrderBy] = useState<React.Key>(initialOrderBy);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [dense, setDense] = useState(false);

  const isSelected = useCallback(
    (id: React.Key) => selected.indexOf(id) !== -1,
    [selected]
  );

  const selectAll = () => {
    if (selected.length === chapters.length) {
      setSelected([]);
    } else {
      setSelected(chapters.map((chapter) => chapter.id));
    }
  };

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - chapters.length) : 0;

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paperContainer}>
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              checked={selected.length === chapters.length}
              indeterminate={
                selected.length > 0 && selected.length < chapters.length
              }
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
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={chapters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};
