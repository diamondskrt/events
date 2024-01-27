import { Matcher } from 'react-day-picker';

export interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | null) => void;
  disabledDays?: Matcher | Matcher[] | undefined;
  allowClear?: boolean;
}
