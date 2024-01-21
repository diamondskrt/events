import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useDropzone } from '@uploadthing/react/hooks';
import { FileWithPath } from '@uploadthing/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';

interface FileUploaderProps {
  imageUrl: string;
  onFieldChange: (url: string) => void;
}

export default function FileUploader({
  imageUrl,
  onFieldChange,
}: FileUploaderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { startUpload } = useUploadThing('imageUploader');

  const onDrop = async (acceptedFiles: FileWithPath[]) => {
    try {
      setIsSubmitting(true);
      const uploadedImages = await startUpload(acceptedFiles);
      if (!uploadedImages?.[0]) return;

      onFieldChange(uploadedImages[0].url);
    } catch (error) {
      toast.error('Poster has not been uploaded');
    } finally {
      setIsSubmitting(false);
    }
  };

  const imgFileTypes = 'image/*';

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: imgFileTypes
      ? generateClientDropzoneAccept([imgFileTypes])
      : undefined,
  });

  const handleRemoveImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onFieldChange('');
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="relative">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 flex-center bg-black/10">
            <Button
              size="icon"
              variant="ghost"
              className="bg-accent/80 text-black"
              onClick={handleRemoveImage}
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" disabled={isSubmitting} className="rounded-full">
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Upload file
        </Button>
      )}
    </div>
  );
}
