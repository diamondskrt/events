export interface PaginationProps {
  totalPages: number;
}

export interface PaginationItemsProps {
  items: number[];
  activePage: number;
  totalPages: number;
  setActivePage: (page: number) => void;
}
