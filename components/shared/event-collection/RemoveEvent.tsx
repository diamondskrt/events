'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { Confirmation } from '@/components/shared/confirmation';
import { useState } from 'react';

interface RemoveEventProps {
  eventId: string;
}

export default function RemoveEvent({ eventId }: RemoveEventProps) {
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    console.log(eventId);
    setOpen(false);
  };

  return (
    <Confirmation open={open} setOpen={setOpen} confirm={onConfirm}>
      <Button size="icon" variant="ghost">
        <TrashIcon />
      </Button>
    </Confirmation>
  );
}
