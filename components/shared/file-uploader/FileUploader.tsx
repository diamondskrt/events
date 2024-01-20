import { Dispatch, SetStateAction, useCallback, MouseEvent } from 'react';
import Image from 'next/image';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { useDropzone } from '@uploadthing/react/hooks';
import { FileWithPath } from '@uploadthing/react';
import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/utils';

interface FileUploaderProps {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  const imgFileTypes = 'image/*';

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: imgFileTypes
      ? generateClientDropzoneAccept([imgFileTypes])
      : undefined,
  });

  const handleRemoveImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFiles([]);
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
        <Button type="button" className="rounded-full">
          Upload file
        </Button>
      )}
    </div>
  );
}
