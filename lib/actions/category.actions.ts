'use server';

import { handleError } from '@/utils';
import dbConnect from '@/lib/database';
import Category from '@/lib/database/models/category.model';

export const createCategory = async (categoryName: string) => {
  try {
    await dbConnect();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getCategories = async () => {
  try {
    await dbConnect();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
