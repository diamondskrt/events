import { useMemo } from 'react';
import { format } from 'date-fns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TimePickerProps } from './model';

export function TimePicker({
  date,
  onValueChange,
  disabledTimes,
}: TimePickerProps) {
  const generatedTimeArray = () => {
    return Array.from({ length: 48 }, (_, index) => {
      const adjustedIndex = (index + 24) % 48;
      const hours = Math.floor(adjustedIndex / 2);
      const minutes = (adjustedIndex % 2) * 30;
      const period = hours >= 12 ? 'AM' : 'PM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes} ${period}`;
    });
  };

  const timeArray = useMemo(() => generatedTimeArray(), []);

  const isDisabledTime = (time: string) => {
    return disabledTimes?.includes(time);
  };

  const formattedTime = () => {
    return date ? format(date, 'hh:mm a') : '';
  };

  return (
    <Select value={formattedTime()} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent>
        {timeArray.map((time, index) => (
          <SelectItem key={index} value={time} disabled={isDisabledTime(time)}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
