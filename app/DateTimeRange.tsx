'use client'
import React, {useState, MouseEvent, useEffect} from 'react';
import {  rem, Popover } from '@mantine/core';
import {TimeInput, DatePicker, DateInput} from '@mantine/dates';
import { addDays, format } from "date-fns";
import { IconChevronDown } from '@tabler/icons-react';

export function DateTimeRange() {
    const [dates, setDates] = useState<[Date | null, Date | null]>([new Date(), addDays(new Date(), 1)]);
    const [pickUpTime, setPickUpTime] = useState(format(new Date(), 'HH:mm'));
    const [dropOffTime, setDropOffTime] = useState(format(new Date(), 'HH:mm'));
    const [showDateTimeRangePicker, setShowDateTimeRangePicker] = useState(false);
    const [labelDateTimeRange, setLabelDateTimeRange] = useState<string>('');

    const handleShowPicker = (event: MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        typeof target.showPicker === 'function' && target.showPicker();
    }

    const formatForLabel = (date: Date | null) => date ? `${format(date, 'EEE, MMM dd, yyyy')}` : '';

    const formatDateAndTime = (date: Date | null, time: string) => (date && time) && format(`${date.toLocaleDateString()} ${time}`, 'yyyy-MM-dd h:mm a')

    const pickerControl = <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />

    const handleDateTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [pickUpDate, dropOffDate] = event.target.value.split(' - ')
        // setLabelDateTimeRange(event.target.value)
    }

    useEffect(() => {
        setLabelDateTimeRange(`${formatForLabel(dates[0])} - ${formatForLabel(dates[1])}`)
        console.log(!dates[1] && showDateTimeRangePicker)
        // if (dates[1] && showDateTimeRangePicker){
        //     setShowDateTimeRangePicker(false)
        // }
    }, [dates, showDateTimeRangePicker])

    return (
        <Popover opened={showDateTimeRangePicker} onChange={e => setShowDateTimeRangePicker(e)}  position="bottom" withArrow shadow="md" >
            <Popover.Target>
                <input
                    className={'w-full'}
                    type="text"
                    value={labelDateTimeRange}
                    onClick={() => setShowDateTimeRangePicker(true)}
                    onChange={handleDateTimeInputChange}
                />
            </Popover.Target>
            <Popover.Dropdown>
                <DatePicker type="range" value={dates} onChange={setDates} />
                <TimeInput
                    label="Pick up time"
                    value={pickUpTime}
                    onChange={({target}) => setPickUpTime(target?.value)}
                    onClick={handleShowPicker}
                    rightSection={pickerControl}
                    rightSectionPointerEvents="none"

                />
                <TimeInput
                    label="Drop off time"
                    value={dropOffTime}
                    onChange={({target}) => setDropOffTime(target?.value)}
                    onClick={handleShowPicker}
                    rightSection={pickerControl}
                    rightSectionPointerEvents="none"
                />
            </Popover.Dropdown>
        </Popover>
    );
}
