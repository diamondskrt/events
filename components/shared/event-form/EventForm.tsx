'use client';

import { useState, useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/shared/file-uploader';
import { DateTimePicker } from '@/components/shared/date-time-picker';

import { cn } from '@/utils';

import { EventFormProps } from './model';
import { formSchema } from './validator';
import { eventDefaultValues } from './constants';
import { Checkbox } from '@/components/ui/checkbox';
import { getCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/event.actions';

export default function EventForm({
  userId,
  type,
  className,
  event,
}: EventFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const isUpdateForm = type === 'Update';

  const initialValues =
    event && isUpdateForm
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

  const disabledDays = [{ before: new Date() }];

  const { startUpload } = useUploadThing('imageUploader');

  const getUploadedImage = async () => {
    try {
      const uploadedImages = await startUpload(files);
      return uploadedImages?.[0].url;
    } catch (error) {
      toast.error('Poster has not been uploaded');
    }
  };

  const onCreateEvent = async (
    uploadedImageUrl: string | undefined,
    values: z.infer<typeof formSchema>
  ) => {
    try {
      if (!uploadedImageUrl) return;

      const newEvent = await createEvent({
        event: { ...values, imageUrl: uploadedImageUrl },
        userId,
        path: '/profile',
      });

      if (!newEvent) return;

      form.reset();
      router.push(`/events/${newEvent._id}`);
    } catch (error) {
      toast.error('Event has not been created');
    }
  };

  const onUpdateEvent = async (
    uploadedImageUrl: string | undefined,
    values: z.infer<typeof formSchema>
  ) => {
    if (!(event?._id && uploadedImageUrl)) {
      router.back();
      return;
    }

    try {
      const updatedEvent = await updateEvent({
        userId,
        event: { ...values, imageUrl: uploadedImageUrl, _id: event._id },
        path: `/events/${event._id}`,
      });

      if (!updatedEvent) return;

      form.reset();
      router.push(`/events/${updatedEvent._id}`);
    } catch (error) {
      toast.error('Event has not been updated');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const uploadedImageUrl = isUpdateForm
      ? values.imageUrl
      : await getUploadedImage();

    if (!uploadedImageUrl) return;

    if (type === 'Create') {
      onCreateEvent(uploadedImageUrl, values);
    }

    if (type === 'Update') {
      onUpdateEvent(uploadedImageUrl, values);
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {type} Event
        </Button>
      </form>
    </Form>
  );
}
