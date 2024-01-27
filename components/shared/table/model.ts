import { ReactNode } from 'react';

export interface Column<Source> {
  title: string;
  dataIndex: keyof Source;
  width?: number;
  align?: string;
  render?: (value: Source[keyof Source]) => ReactNode;
}

export interface TableProps<Source> {
  columns: Column<Source>[];
  dataSource: Source[];
  rowKey: keyof Source;
}
