'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { Confirmation } from '@/components/shared/confirmation';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { deleteEvent } from '@/lib/actions/event.actions';
import { toast } from 'sonner';

interface RemoveEventProps {
  eventId: string;
}

export default function RemoveEvent({ eventId }: RemoveEventProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const onConfirm = async () => {
    try {
      setIsSubmitting(true);
      await deleteEvent({ eventId, path: pathname });

      setOpen(false);
    } catch (error) {
      toast.error('Event has not been deleted');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Confirmation open={open} setOpen={setOpen} confirm={onConfirm}>
      <Button size="icon" variant="ghost" disabled={isSubmitting}>
        <TrashIcon />
      </Button>
    </Confirmation>
  );
}
