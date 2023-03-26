import React, { useState, useCallback } from 'react';
import { Order } from '@types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { getComparator } from '@utils/sorting';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import {
  EnhancedTableHead,
  EnhancedTableHeadProps,
} from '../EnhancedTableHead';
import { TableToolbar, TableToolbarProps } from '../TableToolbar';
import * as styles from './styles';

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 50;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 30, 50];

export interface BaseRowComponent {
  selected: boolean;
  handleRowSelection: (id: React.Key) => void;
}

export interface SelectableTableProps<T extends { id: React.Key }> {
  initialPage?: number;
  data: T[];
  initialOrder?: Order;
  initialRowsPerPage?: number;
  initialOrderBy: React.Key;
  headCells: EnhancedTableHeadProps['cells'];
  rowsPerPageOptions?: number[];
  RowComponent: React.ElementType;
  i18n: TableToolbarProps['i18n'];
  downloadHandler: (items: T[]) => void;
}

export const SelectableTable = <T extends { id: React.Key }>(
  props: SelectableTableProps<T>
) => {
  const {
    i18n,
    data,
    headCells,
    initialOrder,
    initialOrderBy,
    downloadHandler,
    initialPage = DEFAULT_PAGE,
    initialRowsPerPage = DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    RowComponent,
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
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((item) => item.id));
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

  const rows = data
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paperContainer}>
        <TableToolbar
          i18n={i18n}
          selectedItems={selected.length}
          onDownloadHandler={() =>
            downloadHandler(data.filter((item) => isSelected(item.id)))
          }
        />
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              checked={selected.length === data.length}
              indeterminate={
                selected.length > 0 && selected.length < data.length
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
                  <RowComponent
                    {...row}
                    selected={isRowSelected}
                    handleRowSelection={handleRowSelection}
                    key={row.id}
                  />
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
          count={data.length}
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
