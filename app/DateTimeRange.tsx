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

    const handleShowPicker = (event: MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        typeof target.showPicker === 'function' && target.showPicker();
    }

    const formatForLabel = (date: Date | null) => date ? `${format(date, 'EEE, MMM dd, yyyy')}` : '';

    const [labelDateTimeRange, setLabelDateTimeRange] = useState<string>(`${formatForLabel(dates[0])} - ${formatForLabel(dates[1])}`);

    const formatDateAndTime = (date: Date | null, time: string) => (date && time) && format(`${date.toLocaleDateString()} ${time}`, 'yyyy-MM-dd h:mm a')

    const pickerControl = <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />

    const handleDateTimeInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setLabelDateTimeRange(value)
        const [pickUpDate, dropOffDate] = value.split(' - ')
        const isDateValid = (dateStr: string) => String(new Date(dateStr)) !== 'Invalid Date'

        isDateValid(pickUpDate) && setDates(prevDatesState => [new Date(pickUpDate), prevDatesState[1]])
        isDateValid(dropOffDate) && setDates(prevDatesState => [prevDatesState[0], new Date(dropOffDate)])

    }

    const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
        setDates(dates);
        setLabelDateTimeRange(`${formatForLabel(dates[0])} - ${formatForLabel(dates[1])}`)
        if (dates[0] !== null && dates[1] !== null) {
            setShowDateTimeRangePicker(false);
        }
    }

    const handleClosePopover = () => {
        setLabelDateTimeRange(`${formatForLabel(dates[0])} - ${formatForLabel(dates[1])}`)
        setShowDateTimeRangePicker(false);
    }

    return (
        <Popover opened={showDateTimeRangePicker} onChange={handleClosePopover}  position="bottom" withArrow shadow="md" >
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
                <DatePicker type="range" value={dates} onChange={handleDateRangeChange} />
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
