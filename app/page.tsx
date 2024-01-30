'use client'
import {DateTimeRange} from "@/app/DateTimeRange";
import {addDays, format} from "date-fns";
import {useEffect, useState} from "react";
import {DateAndTimeType, isDateValid} from "@/app/shared";

const formatDateAndTime = ({dates, time}: DateAndTimeType) => {
    const formatStr = 'MMM dd, yyyy h:mm a'
    if ((dates[0] && dates[1] && time)){
        const [pickUpDate, dropOffDate] = dates
        const pickupDateAndTime = `${new Date(pickUpDate).toLocaleDateString()} ${time[0]}`
        const dropOffDateAndTime = `${new Date(dropOffDate).toLocaleDateString()} ${time[1]}`

        if (isDateValid(pickupDateAndTime) && isDateValid(dropOffDateAndTime)){
            return `${format(pickupDateAndTime, formatStr)} - ${format(dropOffDateAndTime, formatStr)}`
        }
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
        <main className="h-lvh flex flex-col justify-center gap-4">

            {pickUpDateAndTime && formattedLabel && (
                <div className="w-1/2 mx-auto text-center">
                    <p className="text-lg font-semibold">Formatted Label</p>
                    <p className="text-sm">{formattedLabel}</p>
                </div>
            )}

            <div className="w-1/2 mx-auto">
                <DateTimeRange dates={initialValue.dates} time={initialValue.time} getDatesAndTime={setPickUpDateAndTime} />
            </div>
        </main>
    );
}