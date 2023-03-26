import React from 'react';
import { Order } from '@types';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import TableCell, { TableCellProps } from '@mui/material/TableCell';

export interface EnhancedTableHeadProps {
  checked: CheckboxProps['checked'];
  indeterminate: CheckboxProps['indeterminate'];
  onChange: CheckboxProps['onChange'];
  onRequestSort: (event: React.MouseEvent<unknown>, id: React.Key) => void;
  orderBy?: React.Key | null;
  order?: Order;
  cells: {
    id: React.Key;
    label: string;
    align?: TableCellProps['align'];
    padding?: TableCellProps['padding'];
  }[];
}

export const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const {
    cells,
    order,
    checked,
    orderBy,
    onChange,
    indeterminate,
    onRequestSort,
  } = props;

  const createSortHandler =
    (id: React.Key) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, id);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={checked}
            indeterminate={indeterminate}
            onChange={onChange}
          />
        </TableCell>
        {cells.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align}
            padding={cell.padding}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
