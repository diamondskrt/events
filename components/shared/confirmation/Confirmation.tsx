import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ConfirmationProps } from './model';

export default function Confirmation({
  open,
  setOpen,
  confirm,
  children,
}: ConfirmationProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <p>Are you shure?</p>
          <div className="flex gap-1">
            <Button size="xs" variant="destructive" onClick={confirm}>
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
