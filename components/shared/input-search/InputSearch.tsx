'use client';

import { debounce } from 'ts-debounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/utils';

import { InputSearchProps } from './model';

export default function InputSearch({
  placeholder = 'Search',
}: InputSearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const debounceTime = 300;

  const setQueryParams = () => {
    const newUrl = query
      ? formUrlQuery({
          params: String(searchParams),
          key: 'query',
          value: query,
        })
      : removeKeysFromQuery({
          params: String(searchParams),
          keysToRemove: ['query'],
        });

    router.push(newUrl, { scroll: false });
  };

  const debouncedSetQuery = debounce(setQueryParams, debounceTime);

  useEffect(() => {
    debouncedSetQuery();
  }, [query, debouncedSetQuery]);

  return (
    <Input
      placeholder={placeholder}
      appendIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
