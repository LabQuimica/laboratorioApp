import { DateData } from 'react-native-calendars';

export interface MarkingProps {
  marked?: boolean;
  dotColor?: string;
  dots?: Array<{color: string}>;
  selected?: boolean;
  selectedColor?: string;
  activeOpacity?: number;
}

export interface MarkedDates {
  [date: string]: MarkingProps;
}

export interface DayComponentProps {
  date?: DateData;
  state?: string;
  marking?: MarkingProps;
}