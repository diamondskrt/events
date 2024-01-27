import { ReactNode } from 'react';

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/utils';

import { Column, TableProps } from './model';

export default function Table<Source>({
  columns,
  dataSource,
  rowKey,
}: TableProps<Source>) {
  return (
    <div className="table">
      <UITable>
        <TableHeader>
          <TableRow>
            {columns.map((column: Column<Source>) => {
              const { title, dataIndex, width, align } = column;

              return (
                <TableHead
                  key={String(dataIndex)}
                  className={cn(align && `text-${align}`)}
                  style={{ minWidth: `${width}px` }}
                >
                  {title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource.map((record: Source) => (
            <TableRow key={String(record[rowKey])}>
              {columns.map((column: Column<Source>) => {
                const { dataIndex, render } = column;
                const cellValue = record[dataIndex];

                return (
                  <TableCell
                    key={column.dataIndex as string}
                    className="font-medium"
                  >
                    {render ? render(cellValue) : (cellValue as ReactNode)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </UITable>
      {!dataSource?.length && (
        <div className="w-full text-center p-4">
          <p>No data</p>
        </div>
      )}
    </div>
  );
}
