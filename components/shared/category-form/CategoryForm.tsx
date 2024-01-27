'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory } from '@/lib/actions/category.actions';
import { cn } from '@/utils';

import { formSchema } from './validator';
import { initialValues } from './constants';
import { CategoryFormProps } from './models';

export default function CategoryForm({ className }: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { category } = values;
      await createCategory(category);
      toast.success('Category has been created');
      form.reset();
    } catch (error) {
      toast.error('Category has not been created');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Create Category
        </Button>
      </form>
    </Form>
  );
}
