import { MouseEvent, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils';

import { DatePickerProps } from './model';

export default function DatePicker({
  date,
  onDateChange,
  disabledDays,
  allowClear,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const onSelect = (date: Date | undefined) => {
    setOpen(false);
    onDateChange(date!);
  };

  const onClear = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    onDateChange(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-between text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'P') : <span>Pick a date</span>}
          </div>
          {allowClear && date && (
            <Cross2Icon
              className="text-muted-foreground h-4 w-4"
              onClick={onClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={disabledDays}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
