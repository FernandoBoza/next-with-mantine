'use client'
import React, {useState, MouseEvent, useEffect, useCallback} from 'react';
import {  rem, Popover } from '@mantine/core';
import {TimeInput, DatePicker, DatesRangeValue} from '@mantine/dates';
import { addDays, format } from "date-fns";
import { IconChevronDown } from '@tabler/icons-react';
import {useFormattedState} from "@/app/CustomHooks";
import {debounce} from 'lodash';

type DateTimeRangeType = {
    getDates: (dates: (string | Date | null)[]) => void
}

export function DateTimeRange({getDates}: DateTimeRangeType) {
    const [dates, setDates] = useState<Date[]>([new Date(), addDays(new Date(), 1)]);
    const [pickUpTime, setPickUpTime] = useState(format(new Date(), 'HH:mm'));
    const [dropOffTime, setDropOffTime] = useState(format(new Date(), 'HH:mm'));
    const [showDateTimeRangePicker, setShowDateTimeRangePicker] = useState(false);
    const [debouncedInput, setDebouncedInput] = useState('');
    const [labelDateTimeRange, setLabelDateTimeRange] = useFormattedState([dates[0], dates[1]]);

    const handleShowPicker = (event: MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        typeof target.showPicker === 'function' && target.showPicker();
    }

    const formatDateAndTime = (date: Date | null, time: string) => (date && time) && format(`${date.toLocaleDateString()} ${time}`, 'yyyy-MM-dd h:mm a')

    const handleDateTimeInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        const [pickUpDate, dropOffDate] = value.split(' - ')
        setLabelDateTimeRange([pickUpDate, dropOffDate])
        const isDateValid = (dateStr: string) => String(new Date(dateStr)) !== 'Invalid Date'

        isDateValid(pickUpDate) && setDates(prevDatesState => [new Date(pickUpDate), prevDatesState[1]])
        isDateValid(dropOffDate) && setDates(prevDatesState => [prevDatesState[0], new Date(dropOffDate)])
        getDates([formatDateAndTime(new Date(pickUpDate), pickUpTime), formatDateAndTime(new Date(dropOffDate), dropOffTime)])
    }

    const debouncedDateTimeInputChange = useCallback(debounce(handleDateTimeInputChange, 500), []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebouncedInput(event.target.value);
        debouncedDateTimeInputChange(event);
    }

    const handleDateRangeChange = (dates: Date[]) => {
        setDates(dates);
        setLabelDateTimeRange(dates)
        if (dates[0] !== null && dates[1] !== null) {
            setShowDateTimeRangePicker(false);
            getDates([formatDateAndTime(new Date(dates[0]), pickUpTime), formatDateAndTime(new Date(dates[1]), dropOffTime)])
        }
    }

    const handleClosePopover = () => {
        setLabelDateTimeRange(dates)
        setShowDateTimeRangePicker(false);
    }

    useEffect(() => {
        setDebouncedInput(labelDateTimeRange);
    }, [labelDateTimeRange]);

    useEffect(() => {
        return () => {
            debouncedDateTimeInputChange.cancel();
        };
    }, [debouncedDateTimeInputChange]);

    const chevronDown = <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />

    const handleTimeInputChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = target;
        id === 'pick-up-time' && setPickUpTime(value)
        id === 'drop-off-time' && setDropOffTime(value)
        getDates([formatDateAndTime(dates[0], pickUpTime), formatDateAndTime(dates[1], dropOffTime)])
    };


    return (
        <Popover opened={showDateTimeRangePicker} onChange={handleClosePopover}  position="bottom" withArrow shadow="md" >
            <Popover.Target>
                <input
                    className={'w-full'}
                    type="text"
                    value={debouncedInput}
                    onClick={() => setShowDateTimeRangePicker(true)}
                    onChange={handleInputChange}
                />
            </Popover.Target>
            <Popover.Dropdown>
                <DatePicker type="range" value={dates as [Date, Date]} onChange={handleDateRangeChange as (value: DatesRangeValue) => void} />
                <TimeInput
                    label="Pick up time"
                    id='pick-up-time'
                    value={pickUpTime}
                    onChange={handleTimeInputChange}
                    onClick={handleShowPicker}
                    rightSection={chevronDown}
                    rightSectionPointerEvents="none"

                />
                <TimeInput
                    label="Drop off time"
                    id='drop-off-time'
                    value={dropOffTime}
                    onChange={handleTimeInputChange}
                    onClick={handleShowPicker}
                    rightSection={chevronDown}
                    rightSectionPointerEvents="none"
                />
            </Popover.Dropdown>
        </Popover>
    );
}