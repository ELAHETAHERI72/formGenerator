import {Jalali} from "jalali-ts";
import {DatePickerHelperInterface} from "@shared/types";

export type DateStringArgument = Date | string | number;

export function getStartDateTOMin(startDateFrom: DateStringArgument): number {
  let date: number | null = null;
  if (startDateFrom) {
    date = Jalali.parse(`${startDateFrom}`)?.valueOf() ?? null;
  }
  return date as any;
}

export function getStartDateFromMax(startDateTo: DateStringArgument): number {
  let date: number | null = null;
  if (startDateTo) {
    date = Jalali.parse(`${startDateTo}`)?.valueOf() ?? null;
  }
  return date as any;
}

export function getEndDateTOMin(
  startDateFrom: DateStringArgument,
  endDateFrom: DateStringArgument,
): number {
  let date: number | null = null;
  if (startDateFrom) {
    date = Jalali.parse(`${endDateFrom}`)?.valueOf() ?? null;
  }
  return date as any;
}

export function getEndDateFromMax(
  startDateTo: DateStringArgument,
  endDateTo: DateStringArgument,
): number {
  let date: number | null = null;
  if (startDateTo) {
    date = Jalali.parse(`${endDateTo}`)?.valueOf() ?? null;
  }
  return date as any;
}

export class DatePickerHelper implements DatePickerHelperInterface {
    startDateFrom: string = '';
    startDateTo: string = '';
    endDateFrom: string = '';
    endDateTo: string = '';

}
