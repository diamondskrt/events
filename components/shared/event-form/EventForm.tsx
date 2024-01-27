'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUploader } from '@/components/shared/file-uploader';
import { DateTimePicker } from '@/components/shared/date-time-picker';
import { SelectCategory } from '@/components/shared/select-category';
import { createEvent, updateEvent } from '@/lib/actions/event.actions';
import { getCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { cn } from '@/utils';

import { formSchema } from './validator';
import { eventDefaultValues, maxDescriptionLength } from './constants';
import { EventFormProps } from './model';

export default function EventForm({
  userId,
  type,
  className,
  event,
}: EventFormProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const onGetCategories = async () => {
    try {
      const categoryList = await getCategories();
      setCategories(categoryList);
    } catch (error) {
      toast.error('Categories has not been loaded');
    }
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  const router = useRouter();

  const initialValues =
    event && type === 'Update'
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          categoryId: event.category._id,
        }
      : eventDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { isSubmitting } = form.formState;

  const disabledDays = [{ before: new Date() }];

  const onCreateEvent = async (values: z.infer<typeof formSchema>) => {
    try {
      const newEvent = await createEvent({
        event: { ...values },
        userId,
        path: '/profile',
      });

      form.reset();
      router.push(`/events/${newEvent._id}`);
    } catch (error) {
      toast.error('Event has not been created');
    }
  };

  const onUpdateEvent = async (values: z.infer<typeof formSchema>) => {
    if (!event?._id) {
      router.back();
      return;
    }

    try {
      const updatedEvent = await updateEvent({
        userId,
        event: { ...values, _id: event._id },
        path: `/events/${event._id}`,
      });

      form.reset();
      router.push(`/events/${updatedEvent._id}`);
    } catch (error) {
      toast.error('Event has not been updated');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (type === 'Create') {
      onCreateEvent(values);
    }

    if (type === 'Update') {
      onUpdateEvent(values);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <SelectCategory
                  categoryId={field.value}
                  categories={categories}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event description" rows={4} {...field} />
              </FormControl>
              <FormDescription>
                {field.value.length} / {maxDescriptionLength}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="inline-grid">
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <FileUploader
                  imageUrl={field.value}
                  onFieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location or Online" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Event Time</FormLabel>
              <FormControl>
                <DateTimePicker
                  date={field.value}
                  onDateChange={field.onChange}
                  disabledDays={disabledDays}
                  allowClear
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Event Time</FormLabel>
              <FormControl>
                <DateTimePicker
                  date={field.value}
                  onDateChange={field.onChange}
                  disabledDays={disabledDays}
                  allowClear
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFree"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center mt-2 gap-2">
                  <Checkbox
                    id="price"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="price"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Free Ticket
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {type} Event
        </Button>
      </form>
    </Form>
  );
}
