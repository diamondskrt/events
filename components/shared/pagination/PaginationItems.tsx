import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

import { PaginationItemsProps } from './model';

export default function PaginationItems({
  items,
  activePage,
  totalPages,
  setActivePage,
}: PaginationItemsProps) {
  return items.map((item) => {
    if (item === 2) {
      return activePage > 4 ? (
        <PaginationEllipsis />
      ) : (
        <PaginationItem key={item} onClick={() => setActivePage(item)}>
          <PaginationLink isActive={item === activePage}>{item}</PaginationLink>
        </PaginationItem>
      );
    } else if (item === totalPages - 1) {
      return activePage < totalPages - 3 ? (
        <PaginationEllipsis />
      ) : (
        <PaginationItem key={item} onClick={() => setActivePage(item)}>
          <PaginationLink isActive={item === activePage}>{item}</PaginationLink>
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem key={item} onClick={() => setActivePage(item)}>
          <PaginationLink isActive={item === activePage}>{item}</PaginationLink>
        </PaginationItem>
      );
    }
  });
}
