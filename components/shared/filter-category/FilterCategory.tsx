'use client';

import { toast } from 'sonner';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SelectCategory } from '@/components/shared/select-category';
import { getCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { formUrlQuery, removeKeysFromQuery } from '@/utils';

export default function FilterCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const onGetCategories = async () => {
    try {
      setIsCategoriesLoading(true);
      const categoryList = await getCategories();
      setCategories([{ _id: 'all', name: 'All' }, ...categoryList]);
    } catch (error) {
      toast.error('Categories has not been loaded');
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState('all');

  const setQueryParams = (categoryId: string) => {
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
  };

  const onChange = (categoryId: string) => {
    setCategoryId(categoryId);
    setQueryParams(categoryId);
  };

  return (
    <SelectCategory
      categoryId={categoryId}
      categories={categories}
      loading={isCategoriesLoading}
      onChange={onChange}
    />
  );
}
