import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectCategoryProps } from './model';

export default function SelectCategory({
  categoryId,
  categories,
  onChange,
}: SelectCategoryProps) {
  return (
    <Select onValueChange={onChange} value={categoryId}>
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
