import {Dispatch, SetStateAction} from "react";
import {format} from "date-fns";

export type DateTimeRangeType = {
    getDatesAndTime: Dispatch<SetStateAction<DateAndTimeType>>,
    dates: Date[],
    time: string[]
}

export type DateAndTimeType = {
    dates: Date[],
    time: string[]
}

export const isDateValid = (dateStr: string) => String(new Date(dateStr)) !== 'Invalid Date'

export const formatForLabel = (date: Date | null) => date ? `${format(date, 'EEE, MMM dd, yyyy')}` : '';
