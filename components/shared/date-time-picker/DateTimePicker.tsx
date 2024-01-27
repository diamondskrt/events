import { add, parse } from 'date-fns';

import { DatePicker } from '@/components/shared/date-picker';

import { TimePicker } from './TimePicker';
import { DateTimePickerProps } from './model';

export default function DateTimePicker({
  date,
  onDateChange,
  disabledDays,
  disabledTimes,
  allowClear,
}: DateTimePickerProps) {
  const onTimeChange = (value: string) => {
    const newDate = parse(value, 'hh:mm a', date ?? new Date());
    onDateChange(newDate);
  };

  const onChange = (newDate: Date | null) => {
    const formattedDate = newDate
      ? add(newDate, {
          hours: date?.getHours(),
          minutes: date?.getMinutes(),
        })
      : newDate;

    onDateChange(formattedDate);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-4/5">
        <DatePicker
          date={date}
          disabledDays={disabledDays}
          onDateChange={onChange}
          allowClear={allowClear}
        />
      </div>
      <div className="w-full sm:w-1/5 min-w-[150px]">
        <TimePicker
          date={date}
          disabledTimes={disabledTimes}
          onValueChange={onTimeChange}
        />
      </div>
    </div>
  );
}
