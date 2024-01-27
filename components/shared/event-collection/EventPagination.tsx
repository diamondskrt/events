'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from '@/components/shared/pagination';
import { formUrlQuery } from '@/utils';

import { EventPaginationProps } from './model';

export function EventPagination({ totalPages }: EventPaginationProps) {
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

  useEffect(() => {
    setQueryParams();
  }, [activePage, setQueryParams]);

  return (
    <Pagination
      activePage={activePage}
      setActivePage={setActivePage}
      totalPages={totalPages}
    />
  );
}
