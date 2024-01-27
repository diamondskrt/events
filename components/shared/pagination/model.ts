import { Dispatch, SetStateAction } from 'react';

export interface PaginationProps {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export interface PaginationItemsProps {
  items: number[];
  activePage: number;
  totalPages: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}
