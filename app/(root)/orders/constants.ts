import { Column } from '@/components/shared/table';
import { Source } from './models';
import { format, parseISO } from 'date-fns';

export const columns: Column<Source>[] = [
  {
    title: 'ID',
    dataIndex: '_id',
  },
  {
    title: 'Title',
    dataIndex: 'eventTitle',
  },
  {
    title: 'Buyer',
    dataIndex: 'buyer',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    render: (value) => format(parseISO(value), 'dd.MM.yyy'),
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    render: (value) => `$ ${value}`,
  },
];
