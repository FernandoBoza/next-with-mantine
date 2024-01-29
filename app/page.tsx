'use client'
import {DateTimeRange} from "@/app/DateTimeRange";
import {compareAsc} from "date-fns/compareAsc";
import {useState} from "react";
import {addDays} from "date-fns";

export default function Home() {

    const [dates, setDates] = useState<Date[]>([new Date(), addDays(new Date(), 1)]);

    const getDatesFromDateTimeRangeComponent = (dates: any) => {
        const sortedDates = [...dates].map(date => new Date(date)).sort(compareAsc);
        setDates(sortedDates)
    }

    const handleSubmit = () => {
        console.log(dates)
    }

    return (
        <main className="h-lvh">
            <DateTimeRange getDates={getDatesFromDateTimeRangeComponent} />
            <button className='mt-5 p-3 bg-blue-500 rounded-xl' onClick={handleSubmit}>Submit</button>
        </main>
    );
}
