import { ICategory } from '@/lib/database/models/category.model';

export interface SelectCategoryProps {
  categoryId: string;
  categories: ICategory[];
  onChange: (value: string) => void;
}
