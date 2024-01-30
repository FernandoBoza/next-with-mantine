'use client'
import {DateTimeRange} from "@/app/DateTimeRange";
import {addDays, format} from "date-fns";
import {useEffect, useState} from "react";

export type DateAndTimeType = {
    dates: Date[],
    time: string[]
}


const formatDateAndTime = ({dates, time}: DateAndTimeType) => {
    const formatStr = 'MMM dd, yyyy h:mm a'
    if ((dates[0] && dates[1] && time)){
        const [pickUpDate, dropOffDate] = dates
        const pickupDateAndTime = new Date(pickUpDate).toLocaleDateString() + ' ' + time[0]
        const dropOffDateAndTime = new Date(dropOffDate).toLocaleDateString() + ' ' + time[1]
        return `${format(pickupDateAndTime, formatStr)} - ${format(dropOffDateAndTime, formatStr)}`
    }
    return ''
}

const initialValue = {
    dates: [new Date(), addDays(new Date(), 1)],
    time: [format(new Date(), 'HH:mm'),format(new Date(), 'HH:mm')]
}

export default function Home() {

    const [pickUpDateAndTime, setPickUpDateAndTime] = useState<DateAndTimeType>(initialValue)
    const [formattedLabel, setFormattedLabel] = useState<string>(formatDateAndTime(pickUpDateAndTime))
    
    useEffect(() => {
        setFormattedLabel(formatDateAndTime(pickUpDateAndTime))
    }, [pickUpDateAndTime, setPickUpDateAndTime]);

    return (
        <main className="h-lvh">
            <DateTimeRange dates={initialValue.dates} time={initialValue.time} getDatesAndTime={setPickUpDateAndTime} />

            {pickUpDateAndTime && formattedLabel && (
                <div className="mt-4">
                    <p className="text-lg font-semibold">Formatted Label</p>
                    <p className="text-sm">{formattedLabel}</p>
                </div>
            )}
        </main>
      );
}
