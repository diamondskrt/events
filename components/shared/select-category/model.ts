import { ICategory } from '@/lib/database/models/category.model';

export interface SelectCategoryProps {
  categoryId: string;
  categories: ICategory[];
  loading: boolean;
  onChange: (value: string) => void;
}
