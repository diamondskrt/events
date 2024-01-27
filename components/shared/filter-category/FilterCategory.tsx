'use client';

import { toast } from 'sonner';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SelectCategory } from '@/components/shared/select-category';
import { getCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { formUrlQuery, removeKeysFromQuery } from '@/utils';

export default function FilterCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const onGetCategories = async () => {
    try {
      const categoryList = await getCategories();
      setCategories([{ _id: 'all', name: 'All' }, ...categoryList]);
    } catch (error) {
      toast.error('Categories has not been loaded');
    }
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState('all');

  const setQueryParams = useCallback(() => {
    const newUrl =
      categoryId && categoryId !== 'all'
        ? formUrlQuery({
            params: String(searchParams),
            key: 'categoryId',
            value: categoryId,
          })
        : removeKeysFromQuery({
            params: String(searchParams),
            keysToRemove: ['categoryId'],
          });

    router.push(newUrl, { scroll: false });
  }, [categoryId, router, searchParams]);

  useEffect(() => {
    setQueryParams();
  }, [categoryId, setQueryParams]);

  const onChange = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  return (
    <SelectCategory
      categoryId={categoryId}
      categories={categories}
      onChange={onChange}
    />
  );
}
