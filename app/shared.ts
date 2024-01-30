import {Dispatch, SetStateAction} from "react";

export const isDateValid = (dateStr: string) => String(new Date(dateStr)) !== 'Invalid Date'

export type DateTimeRangeType = {
    getDatesAndTime: Dispatch<SetStateAction<DateAndTimeType>>,
    dates: Date[],
    time: string[]
}

export type DateAndTimeType = {
    dates: Date[],
    time: string[]
}