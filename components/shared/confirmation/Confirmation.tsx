import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  children: ReactNode;
}

export default function Confirmation({
  open,
  setOpen,
  confirm,
  children,
}: ConfirmationProps) {
  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <p>Are you shure?</p>
          <div className="flex gap-1">
            <Button size="xs" variant="ghost" onClick={confirm}>
              Yes
            </Button>
            <Button size="xs" variant="ghost" onClick={() => setOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
