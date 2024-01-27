import { Matcher } from 'react-day-picker';

export interface DateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | null) => void;
  disabledDays?: Matcher | Matcher[] | undefined;
  disabledTimes?: string[];
  allowClear?: boolean;
}

export interface TimePickerProps {
  date: Date | undefined;
  onValueChange: (value: string) => void;
  disabledTimes?: string[];
}
