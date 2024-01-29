'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn, formUrlQuery } from '@/utils';

import PaginationItems from './PaginationItems';
import { PaginationProps } from './model';

export default function Pagination({ totalPages }: PaginationProps) {
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParams = useCallback(() => {
    const newUrl = formUrlQuery({
      params: String(searchParams),
      key: 'page',
      value: String(activePage),
    });

    router.push(newUrl, { scroll: false });
  }, [activePage, router, searchParams]);

  const getGeneratedItems = () => {
    if (totalPages > 7) {
      return [3, 4, 5];
    } else {
      if (totalPages > 2) {
        return Array.from({ length: totalPages - 2 }, (_, index) => 3 + index);
      } else {
        return [];
      }
    }
  };

  const [generatedPaginationItems, setGeneratedPaginationItems] =
    useState(getGeneratedItems());

  const paginationItems = [1, 2];

  if (totalPages > 2) {
    paginationItems.push(...generatedPaginationItems);
  }

  if (totalPages > 7) {
    paginationItems.push(totalPages - 1, totalPages);
  }

  const onIncrement = () => {
    if (activePage === totalPages) return;

    onSetActivePage(activePage + 1);
  };

  const onDecrement = () => {
    if (activePage === 1) return;

    onSetActivePage(activePage - 1);
  };

  const onSetActivePage = (page: number) => {
    setActivePage(page);
    document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setQueryParams();

    if (totalPages <= 7) return;

    const newArr = Array.from({ length: 3 }, (_, index) => {
      if (activePage < 4) {
        return 3 + index;
      } else if (activePage > totalPages - 3) {
        return totalPages - 4 + index;
      } else {
        return activePage - 1 + index;
      }
    });

    setGeneratedPaginationItems(newArr);
  }, [activePage, totalPages, setQueryParams]);

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(activePage === 1 && 'disabled')}
            onClick={onDecrement}
          />
        </PaginationItem>
        {totalPages > 7 ? (
          <PaginationItems
            items={paginationItems}
            activePage={activePage}
            setActivePage={onSetActivePage}
            totalPages={totalPages}
          />
        ) : (
          paginationItems.map((item) => (
            <PaginationItem key={item} onClick={() => onSetActivePage(item)}>
              <PaginationLink isActive={item === activePage}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ))
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(activePage === totalPages && 'disabled')}
            onClick={onIncrement}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}
